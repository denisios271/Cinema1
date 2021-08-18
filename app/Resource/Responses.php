<?php

namespace App\Resource;

use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

trait Responses
{
    /**
     * Response after succesfully event
     *
     * @param integer $statusCode Http's status code
     * @return Response
     */
    protected function successfulResponse($statusCode = 200)
    {
        return response()->json($this->object, $statusCode);
    }

    /**
     * Response after failed event
     *
     * @param integer $statusCode Http's status code
     * @return Response
     */
    protected function failedResponse($statusCode = 404)
    {
        return response()->json($this->getNotFoundMessage(), $statusCode);
    }
}
