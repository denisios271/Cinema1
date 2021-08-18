<?php

namespace App\Vk\Api;

class Api
{
    /** @var array Array of all params. Will be converted via http_build_query and append th the request as a GET query string. */
    protected $params;

    /** @var string VK API's method (like 'messages.send'). Should be without any '/', '?'...! */
    protected $method;

    public function __construct(array $params = [])
    {
        if (!isset($params['access_token'])) {
            // if we want to set specific access_token
            $params['access_token'] = config('vk.community.token');
        }
        if (!isset($params['v'])) {
            // if we want to set specific api version
            $params['v'] = config('vk.api.version');
        }
        $this->params = $params;
        return $this;
    }

    public function getParams(): array
    {
        return $this->params;
    }

    public function send()
    {
        $query = http_build_query($this->params);
        $host = config('vk.api.host');
        $response = json_decode(file_get_contents("{$host}/{$this->method}?{$query}"));

        if (isset($response->response)) {
            return $response->response;
        }

        throw new \Exception("({$response->error->error_code}) {$response->error->error_msg}");
    }
}
