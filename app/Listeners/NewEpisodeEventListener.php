<?php

namespace App\Listeners;

use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use App\Events\NewEpisode;
use App\Vk\Service\SendNewEpisode;
use App\Eloquents\FavoritePost;

class NewEpisodeEventListener
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  object  $event
     * @return void
     */
    public function handle(NewEpisode $event)
    {
        $event->post->id;
        $favoritePosts = FavoritePost::wherePostId($event->post->id)->get();
        $userIds = $favoritePosts->filter(function (FavoritePost $p) {
            return $p->user->auth_type == 'vk';
        })->map(function (FavoritePost $p) {
            return $p->user->social_data->mid;
        });
        SendNewEpisode::toUsers($event->episode, $userIds->all());
    }
}
