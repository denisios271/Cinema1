<?php

namespace App\Vk\Api\Photos;

use App\Vk\Api\Api;

/**
 * Sends message to the users
 *
 * @see https://vk.com/dev/photos.saveWallPhoto
 */
class SaveWallPhoto extends Api
{
    protected $method = 'photos.saveWallPhoto';

    /**
     * @param string $access_token User's access token. VK needs only it to upload picture.
     */
    public function __construct(string $access_token, string $server, string $hash, string $photo)
    {
        parent::__construct([
            'access_token' => $access_token,
            'server' => $server,
            'hash' => $hash,
            'photo' => $photo,
        ]);
    }
}
