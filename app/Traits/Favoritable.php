<?php

namespace App\Traits;

trait Favoritable
{
    public function addToFavorite(User $user): FavoriteArticle
    {
        return FavoriteArticle::create([
            'article_id' => $articleId,
            'user_id' => $user->id,
        ]);
    }

    public function removeFromFavorite(User $user): FavoriteArticle
    {
        $favorite = Auth::user()->favoriteArticles()->whereArticleId($request->article_id)->first();
        $favorite->delete();
        return true;
    }
}
