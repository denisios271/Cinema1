<?php

namespace App\Traits;

use App\Eloquents\User;

trait Requestable
{
    public function acceptInserting(User $user)
    {
        $this->requested_adding = 0;
        $this->requested_adding_user = $user->id;
        $this->save();

        $className = self::class;
        $user->log("Accepted inserting resource {$className} ({$this->id})");
    }

    public function declineRemoving(User $user)
    {
        $this->requested_removing = 0;
        $this->requested_removing_user = null;
        $this->save();

        $className = self::class;
        $user->log("Declined removing resource {$className} ({$this->id})");
    }

    public function createRemoving(User $user)
    {
        $this->requested_removing = 1;
        $this->requested_removing_user = $user->id;
        $this->save();

        $className = self::class;
        $user->log("Requested removing resource {$className} ({$this->id})");
    }

    public static function requestedInsertingScope()
    {
        return self::whereRequestedAdding(1);
    }

    public static function requestedRemovingScope()
    {
        return self::whereRequestedRemoving(1);
    }

    public static function getRequestedInserting()
    {
        return self::requestedInsertingScope()->get();
    }

    public static function getRequestedRemoving()
    {
        return self::requestedRemovingScope()->get();
    }
}
