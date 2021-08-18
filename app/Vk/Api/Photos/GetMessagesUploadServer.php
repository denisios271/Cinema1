<?php

namespace App\Vk\Api\Photos;

use App\Vk\Api\Api;

/**
 * Sends message to the users
 *
 * @see https://vk.com/dev/photos.getMessagesUploadServer
 */
class GetMessagesUploadServer extends Api
{
    protected $method = 'photos.getMessagesUploadServer';

    public function __construct()
    {
        parent::__construct();
    }
}
