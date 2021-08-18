<?php

namespace App\Vk\Api\Photos;

use App\Vk\Api\Api;

/**
 * Sends message to the users
 *
 * @see https://vk.com/dev/photos.getWallUploadServer
 */
class GetWallUploadServer extends Api
{
    protected $method = 'photos.getWallUploadServer';

    /**
     * @param string $access_token User's access token. VK needs only it to upload picture.
     */
    public function __construct(string $access_token)
    {
        parent::__construct([
            'owner_id' => 0 - config('vk.community.id'),
            'access_token' => $access_token,
        ]);
    }
}
