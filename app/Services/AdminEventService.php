<?php

namespace App\Services;

use App\Eloquents\User;

class AdminEventService
{
    /** @var User */
    protected $admin;

    public function __construct(User $admin)
    {
        $this->admin = $admin;
    }

    /**
     * Unmutes user
     *
     * @param User $user
     * @param integer $minutes If null or 0 - user will be muted to ALL time without expiration date
     * @return void
     */
    public function muteUser(User $user, int $minutes = null)
    {
        $user->mute($minutes);
    }

    public function unmuteUser(User $user)
    {
        $user->unmute();
    }
}
