<?php

namespace App\Http\Controllers\Auth\SocialNetworks;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Vk\Api\Messages\IsMessagesFromGroupAllowed;

class Vk extends SocialNetwork
{
    public function __construct()
    {
        $this->authType = 'vk';
    }

    protected function getUsername($uid)
    {
        $uname = [];
        if ($this->userData['user']['first_name']) {
            $uname[] = $this->userData['user']['first_name'];
        }
        if ($this->userData['user']['last_name']) {
            $uname[] = $this->userData['user']['last_name'];
        }
        $uname = implode(" ", $uname);
        if ($uname) {
            return $uname;
        }
        return parent::getUsername($uid);
    }

    protected function check()
    {
        $session = array();
        $member = false;
        $valid_keys = array('expire', 'mid', 'secret', 'sid', 'sig');
        $session_data = $this->userData;

        foreach ($session_data as $key => $value) {
            if (empty($key) || empty($value) || !in_array($key, $valid_keys)) {
                continue;
            }
            $session[$key] = $value;
        }
        foreach ($valid_keys as $key) {
            if (!isset($session[$key])) {
                return false;
            }
        }
        ksort($session);
    
        $sign = '';
        foreach ($session as $key => $value) {
            if ($key != 'sig') {
                $sign .= ($key.'='.$value);
            }
        }
        $sign .= config('vk.app.secret');
        $sign = md5($sign);
        if ($session['sig'] == $sign && $session['expire'] > time()) {
            $member = array(
                'id' => intval($session['mid']),
                'secret' => $session['secret'],
                'sid' => $session['sid']
            );
        }

        if ($member) {
            $this->userData['canReceiveCommunityMessage'] = (new IsMessagesFromGroupAllowed($member['id']))->send();
        }

        return $member;
    }

    protected function getUserSocialId()
    {
        $data = $this->userData;
        foreach ($data as $key => $value) {
            if (empty($key) || empty($value) || $key != 'mid') {
                continue;
            }
            return intval($value);
        }
        return null;
    }
}
