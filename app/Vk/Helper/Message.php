<?php

namespace App\Vk\Helper;

use App\Eloquents\Series;
use App\Eloquents\Series_content;
use GuzzleHttp\Client;
use App\Vk\Api\Photos\SaveWallPhoto;
use CURLFile;
use App\Vk\Api\Photos\SaveMessagesPhoto;
use App\Vk\Api\Photos\GetWallUploadServer;
use App\Vk\Api\Photos\GetMessagesUploadServer;

class Message
{
    /**
     * @param Series $episode
     * @param string $access_token Set it if you want to publish episode on the Wall
     *
     * @return array 'message' & 'attachements' keys
     */
    public static function newEpisode(Series $episode, string $access_token = ''): array
    {
        return [
            'message' => self::newEpisodeMessage($episode),
            'attachements' => self::newEpisodeAttachements($episode, $access_token),
        ];
    }

    /**
     * Uses view for render message for Wall or Message things
     *
     * @param Series $episode
     * @return string
     */
    public static function newEpisodeMessage(Series $episode): string
    {
        return view('vk.message.new-episode', [
            'title' => $episode->name,
            'uri' => url("post/{$episode->post->alt_name}"),
            'voicers' => explode(', ', $episode->post->voicers),
            'timers' => explode(', ', $episode->post->timers),
            'translaters' => explode(', ', $episode->post->translaters),
            'hashtags' => explode(',', $episode->post->tags),
        ])->render();
    }

    /**
     * Sets Poster & Video attachements
     *
     * @param Series $episode
     * @param string $access_token Set it if you want to publish episode on the community Wall
     * @return array
     */
    public static function newEpisodeAttachements(Series $episode, string $access_token = ''): array
    {
        $data = [];
        if ($access_token) {
            $data[] = "https://firedub.net";
            $data[] = self::uploadAndGetPosterAttachementForWall($access_token, $episode);
        } else {
            $data[] = self::uploadAndGetPosterAttachementForMessage($episode);
        }
        $vkPlayer = self::getPlayerAttachement($episode);
        if ($vkPlayer) {
            $data[] = $vkPlayer;
        }
        return $data;
    }

    /**
     * Searches VK player in current episode and tries to convert it into attachement
     *
     * @param Series $episode
     * @param string $access_token
     * @return string|null If video was been found - will return in format "video{$ownerId}_{$mediaId}" else 'null'
     */
    public static function getPlayerAttachement(Series $episode)
    {
        $vkPlayer = null;
        $episode->players->each(function (Series_content $player) use (&$vkPlayer) {
            // '1' is the VK player
            if ($player->player_id == 1) {
                $vkPlayer = $player->url;
            }
        });
        if (!$vkPlayer) {
            return null;
        }

        // example: //vk.com/video_ext.php?oid=-134724965&id=456239172&hash=40682b6c7f6860ef
        // we need oid & id
        $explodedVideoUrl = explode('?', $vkPlayer); // now it contains 0 => "//vk.com..." & 1 => "oid=...&id=..."
        $queryParts = explode("&", $explodedVideoUrl[1]); // now it contains 'oid=...', 'id=...'
        $ids = []; // it should be like 'oid' => ..., 'id' => ...
        foreach ($queryParts as $queryPart) {
            $keyAndValue = explode('=', $queryPart);
            if (count($keyAndValue) == 2) {
                $ids[$keyAndValue[0]] = $keyAndValue[1];
            }
        }

        if (isset($ids['oid']) && isset($ids['id'])) {
            return "video{$ids['oid']}_{$ids['id']}";
        }

        return null;
    }

    /**
     * Uploads poster to the server for sending to Message
     *
     * @param Series $episode
     * @return string
     */
    public static function uploadAndGetPosterAttachementForMessage(Series $episode): string
    {
        $vkUploadUrl = (new GetMessagesUploadServer())->send()->upload_url;
        $response = self::sendPosterToServer($episode, $vkUploadUrl);
        $photoDetails = (new SaveMessagesPhoto($response->server, $response->hash, $response->photo))->send()[0];
        return "photo{$photoDetails->owner_id}_{$photoDetails->id}";
    }

    /**
     * Uploads poster to the server for sending to Wall
     *
     * @param string $access_token
     * @param Series $episode
     * @return string
     */
    public static function uploadAndGetPosterAttachementForWall(string $access_token, Series $episode): string
    {
        $vkUploadUrl = (new GetWallUploadServer($access_token))->send()->upload_url;
        $response = self::sendPosterToServer($episode, $vkUploadUrl);
        $photoDetails = (new SaveWallPhoto($access_token, $response->server, $response->hash, $response->photo))->send()[0];
        return "photo{$photoDetails->owner_id}_{$photoDetails->id}";
    }

    /**
     * After getting upload url use this method. It sends poster to the server.
     *
     * @param Series $episode
     * @param string $vkUploadUrl
     * @return stdObject with some fields like server, hash, photo
     */
    public static function sendPosterToServer(Series $episode, string $vkUploadUrl)
    {
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_POST, true);
        curl_setopt($curl, CURLOPT_POSTFIELDS, [
            'photo' => new CURLFile($_SERVER['DOCUMENT_ROOT'] . $episode->post->poster),
        ]);
        curl_setopt($curl, CURLOPT_URL, $vkUploadUrl);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        $response = json_decode(curl_exec($curl));
        curl_close($curl);
        return $response;
    }
}
