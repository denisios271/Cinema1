<?php

namespace App\Services;

use App\Eloquents\User;
use App\Eloquents\Post;
use App\Eloquents\PostComment;

class PostCommentService
{
    public static function comment(User $user, Post $post, string $message)
    {
        $comment = new PostComment;
        $comment->user_id = $user->id;
        $comment->post_id = $post->id;
        $comment->body = $message;
        $comment->save();
        return $comment;
    }

    public static function canUserComment(User $user, Post $post)
    {
        $lastFewComments = $post->comments()->latest()->take(10)->get();
        $userComments = $lastFewComments->filter(function (PostComment $comment) use ($user) {
            return $comment->user_id == $user->id;
        });
        if ($userComments->count() >= 7) {
            $commentTimestamp = $userComments[0]->created_at->timestamp;
            if ($commentTimestamp + 60 * 5 > time()) {
                // okey, well, user tries to spam us
                return false;
            }
            return true;
        }
        return true;
    }

    public static function mute(User $user)
    {
        // TODO: create it
    }
}
