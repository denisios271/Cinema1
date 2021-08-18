<?php

namespace App\Vk\Api\Messages;

use App\Vk\Api\Api;
use App\Eloquents\User;

/**
 * Returns information whether sending messages from the community to current user is allowed
 *
 * @see https://vk.com/dev/messages.isMessagesFromGroupAllowed
 */
class IsMessagesFromGroupAllowed extends Api
{
    protected $method = 'messages.isMessagesFromGroupAllowed';

    /**
     * @param int $userVkId vk user's id
     */
    public function __construct(int $vkUserId)
    {
        parent::__construct([
            'user_id' => $vkUserId,
            'group_id' => config('vk.community.id'),
        ]);
    }
}
