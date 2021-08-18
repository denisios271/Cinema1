<?php

namespace App\Vk\Api\Messages;

use App\Vk\Api\Api;

/**
 * Sends message to the users
 *
 * @see https://vk.com/dev/messages.send
 */
class Send extends Api
{
    protected $method = 'messages.send';

    /**
     * @param array $userIds Array of user ids like [ 50428646, 50428646, 50428646... ]
     * @param string $message Message to be sent
     */
    public function __construct(array $userIds, string $message, array $attachment = [])
    {
        parent::__construct([
            'message' => $message,
            'user_ids' => implode(',', $userIds),
            'attachment' => implode(',', $attachment),
        ]);
    }
}
