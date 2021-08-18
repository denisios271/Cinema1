<?php

namespace App\Services;

use App\Eloquents\Article;
use App\Eloquents\User;
use App\Eloquents\FavoriteArticle;

class ArticleService
{
    /**
     * Returns list of articles paginated by given settings
     *
     * @param string $title
     * @param integer $page
     * @param integer $perPage
     * @return Article[]
     */
    public static function search(string $title, int $page, int $perPage)
    {
        return Article::with(['publisher'])
            ->whereRequestedAdding(0)
            ->where('title', 'like', "%{$title}%")
            ->paginate($perPage, ['*'], 'page', $page);
    }
    
    /**
     * Returns popular news
     *
     * @param integer $page
     * @param integer $perPage
     * @return Article[]
     */
    public static function getPopular(int $page = 1, int $perPage = 25)
    {
        return self::getList('requests', 'DESC', $page, $perPage);
    }

    /**
     * Returns new news
     *
     * @param integer $page
     * @param integer $perPage
     * @return Article[]
     */
    public static function getNewest(int $page = 1, int $perPage = 25)
    {
        return self::getList('id', 'DESC', $page, $perPage);
    }

    /**
     * Returns list of articles ordered by field and position (desc/asc)
     *
     * @param string $orderField
     * @param string $orderPosition
     * @param integer $page
     * @param integer $perPage
     * @return Pagination|Article
     */
    public static function getList(string $orderField, string $orderPosition = 'DESC', int $page = 1, int $perPage = 25)
    {
        return Article::with(['publisher'])
            ->where('requested_adding', 0)
            ->orderBy($orderField, $orderPosition)
            ->paginate($perPage, ['*'], 'page', $page);
    }

    public static function remove(Article $article, User $user)
    {
        $id = $article->id;
        $requestedAdding = $article->requested_adding;
        $requestedRemoving = $article->requested_removing;
        $article->delete();

        if ($requestedAdding) {
            $user->log("Declined inserting Article ({$id})");
        } elseif ($requestedRemoving) {
            $user->log("Accepted removing and removed Article ({$id})");
        } else {
            $user->log("Removed Article ({$id})");
        }

        return response(['message' => 'Ресурс успешно удален'], 200);
    }

    public static function create(User $user, $values): Article
    {
        $article = new Article;
        $article->user_id = $user->id;
        $article->title = $values['title'];
        $article->uri = $values['uri'];
        $article->hashtags = $values['hashtags'];
        $article->content = $values['content'];
        if ($user->user_group == 3) {
            $article->requested_adding = 1;
            $article->requested_adding_user = $user->id;
        }
        $article->save();

        if ($article->requested_adding) {
            $user->log("Requested inserting Article ({$article->id})");
        } else {
            $user->log("Inserted Article ({$article->id})");
        }

        return $article;
    }

    public static function update(Article $article, User $user, $values): Article
    {
        $article->title = $values['title'];
        $article->hashtags = $values['hashtags'];
        $article->content = $values['content'];
        $article->save();

        $user->log("Edited Article ({$article->id})");

        return $article;
    }
}
