<?php

return [
    'api' => [
        'version' => 5.73,
        'host' => "https://api.vk.com/method/",
    ],

    'community' => [
        'id' => 134724965,
        'token' => env('VK_COMMUNITY_TOKEN', ''),
    ],

    'app' => [
        'id' => 6217111,
        'secret' => env('VK_APP_SECURE_KEY', ''),
    ],
];
