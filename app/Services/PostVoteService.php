<?php

namespace App\Services;

use App\Eloquents\User;
use App\Eloquents\Post;
use App\Eloquents\PostVote;

class PostVoteService
{
    public static function voteFor(User $user, Post $post, int $vote)
    {
        $user->disableAllVotesForPost($post);
        return $user->voteForPost($post, $vote);
    }
}
