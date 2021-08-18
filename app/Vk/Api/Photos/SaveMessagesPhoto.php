<?php

namespace App\Vk\Api\Photos;

use App\Vk\Api\Api;

/**
 * Sends message to the users
 *
 * @see https://vk.com/dev/photos.saveMessagesPhoto
 */
class SaveMessagesPhoto extends Api
{
    protected $method = 'photos.saveMessagesPhoto';

    /**
     * @param string $access_token User's access token. VK needs only it to upload picture.
     */
    public function __construct(string $server, string $hash, string $photo)
    {
        parent::__construct([
            'server' => $server,
            'hash' => $hash,
            'photo' => $photo,
        ]);
    }
}
