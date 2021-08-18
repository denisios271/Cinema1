<?php

namespace App\Vk\Service;

use App\Eloquents\Series;
use Illuminate\Http\Request;
use App\Vk\Helper\Message;
use App\Vk\Helper\Token;
use App\Vk\Api\Photos\GetWallUploadServer;
use App\Vk\Api\Photos\GetMessagesUploadServer;
use App\Vk\Api\Messages\Send;
use App\Vk\Api\Wall\Post;
use function GuzzleHttp\json_encode;

class SendNewEpisode
{
    public static function toGroupWall(Request $request, Series $episode)
    {
        $token = Token::getUserAccessTokenByCode($request)->access_token;
        $m = Message::newEpisode($episode, $token);
        echo "
        <h1>" . $episode->name . "</h1>
        <h2>Серия будет лежать в предложке в течении 15 минут. Проверьте ее перед публикацией!</h2>
        
        <button onclick=\"publish()\">
            Опубликовать!
        </button>

        <a href=\"https://firedub.net\">Назад на сайт</a>

        <div id=\"vk_community_messages\"></div>

        <script src=\"//vk.com/js/api/openapi.js\"></script>
        <script src=\"/js/vk.js\"></script>
        
        <script>
        function publish() {
            VK.Api.call('wall.post', {
                message: " . json_encode($m['message']) . ",
                attachment: " . json_encode($m['attachements']) . ",
                owner_id: -134724965,
                from_group: 1,
                publish_date: Date.now() / 1000 + 60 * 15,
            }, console.info);
        }
        </script>
        ";
        // dd((new Post($token, $m['message'], $m['attachements']))->send());
    }

    public static function toUsers(Series $episode, array $userIds)
    {
        // send message with the data
        $m = Message::newEpisode($episode);
        if (count($userIds)) {
            (new Send($userIds, $m['message'], $m['attachements']))->send();
        }
    }
}
