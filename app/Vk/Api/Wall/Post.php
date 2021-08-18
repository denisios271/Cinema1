<?php

namespace App\Vk\Api\Wall;

use App\Vk\Api\Api;

/**
 * Sends message to the users
 *
 * @see https://vk.com/dev/messages.send
 */
class Post extends Api
{
    protected $method = 'wall.post';

    /**
     * @param array $userIds Array of user ids like [ 50428646, 50428646, 50428646... ]
     * @param string $message Message to be sent
     */
    public function __construct(string $accessToken, string $message, array $attachment = [])
    {
        parent::__construct([
            'access_token' => $accessToken,
            'message' => $message,
            'attachment' => implode(',', $attachment),
            'owner_id' => 0 - config('vk.community.id'),
            'from_group' => 1,
            'publish_date' => time() + 60 * 30,
        ]);
    }
}
