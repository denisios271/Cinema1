<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use App\Eloquents\Article;
use App\Eloquents\FavoriteArticle;
use App\Http\Requests\Article\RemoveFromFavorite;
use App\Http\Requests\Article\AddToFavorite;
use App\Http\Requests\Article\Search;
use App\Services\ArticleService;
use App\Http\Controllers\Controller;
use App\Http\Requests\Article\Create;
use App\Http\Requests\Article\Update;

class ArticleController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth:api', 'requiredUserRight:3'])->only(['add', 'sendRequestForRemoving']);
        $this->middleware(['auth:api', 'requiredUserRight:2'])->only(['edit', 'acceptAddingRequest']);
        $this->middleware(['auth:api', 'requiredUserRight:1'])->only(['remove', 'declineRemovingRequest']);
        $this->middleware('auth:api')->only(['addToFavorite', 'removeFromFavorite']);
    }

    public function create(Create $request)
    {
        try {
            return ArticleService::create(Auth::user(), $request->all());
        } catch (\Exception $e) {
            abort(500, $e);
        }
    }
    
    public function update(Update $request, int $articleId)
    {
        $article = Article::findOrFail($articleId);
        try {
            return ArticleService::update($article, Auth::user(), $request->all());
        } catch (\Exception $e) {
            abort(500, $e);
        }
    }
    
    public function remove(int $articleId)
    {
        $article = Article::findOrFail($articleId);
        try {
            ArticleService::remove($article, Auth::user());
            return response(['message' => 'Ресурс успешно удален'], 200);
        } catch (\Exception $e) {
            abort(500, $e);
        }
    }

    public function getRequestedForAdding()
    {
        return Article::getRequestedInserting();
    }
    
    public function getRequestedForRemoving()
    {
        return Article::getRequestedRemoving();
    }

    public function acceptAddingRequest($articleId)
    {
        $article = Article::findOrFail($articleId);
        $article->acceptInserting(Auth::user());
        return $article;
    }

    public function declineRemovingRequest($articleId)
    {
        $article = Article::findOrFail($articleId);
        $article->declineRemoving(Auth::user());
        return $article;
    }

    public function sendRequestForRemoving($articleId)
    {
        $article = Article::findOrFail($articleId);
        $article->createRemoving(Auth::user());
        return response(['message' => 'Ресурс запрошен на удаление'], 200);
    }

    public function getById($id)
    {
        return Article::findOrFail($id);
    }

    public function getByUri($uri)
    {
        return Article::whereUri($uri)->firstOrFail();
    }

    /**
     * Returns popular news
     *
     * @param integer $page
     * @param integer $perPage
     * @return Response
     */
    public function getPopular(int $page = 1, int $perPage = 25)
    {
        $articles = ArticleService::getPopular($page, $perPage);
        abort_if(!$articles->count(), 404, 'Статьи не найдены');
        return $articles;
    }

    /**
     * Returns new news
     *
     * @param integer $page
     * @param integer $perPage
     * @return Response
     */
    public function getNew(int $page = 1, int $perPage = 25)
    {
        $articles = ArticleService::getNewest($page, $perPage);
        abort_if(!$articles->count(), 404, 'Статьи не найдены');
        return $articles;
    }

    public function addToFavorite(AddToFavorite $request)
    {
        $article = Article::find($request->article_id);
        try {
            $article->addToFavorite(Auth::user());
            return response()->json(null, 200);
        } catch (\Exception $e) {
            abort(500, $e->getMessage());
        }
    }

    public function removeFromFavorite(RemoveFromFavorite $request)
    {
        $article = Article::find($request->article_id);
        try {
            $article->removeFromFavorite(Auth::user());
            return response()->json(null, 200);
        } catch (\Exception $e) {
            abort(500, $e->getMessage());
        }
    }

    public function getFavorites()
    {
        return Auth::user()->favoriteArticles;
    }

    public function search(Search $request, $page = 1, $perPage = 12)
    {
        $articles = ArticleService::search($request->title, $page, $perPage);
        if (!$articles->count()) {
            abort(404, 'Новости не найдены');
        }
        return response()->json($articles, 200);
    }
}
