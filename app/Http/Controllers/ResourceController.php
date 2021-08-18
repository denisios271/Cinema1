<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Resource;

abstract class ResourceController extends Controller
{
    use Resource\Hooks, Resource\Responses, Resource\DB;

    /**
     * Should containt array with relationships which should be sent to user with our object.
     * It's the `with(...)` method of Eloquent Laravel model.
     *
     * @var array(string)
     */
    protected $relationships = [];

    /**
     * Should contains all validation rules
     *
     * @var array
     */
    protected $validationRules = [];

    /**
     * Stores availabel rights for methods
     * Right keys:
     * 1 - Admin
     * 2 - Moderate (can remove some things)
     * 3 - Has access to Admin panel (default is - add, edit things)
     * 4 - Just a user
     * 5 - Guest
     *
     * @var array Each element should contains array of methods name. Each element should has a key - rights id.
     */
    protected $rights = [
        3 => ['add', 'sendRequestForRemoving'],
        2 => ['edit', 'acceptAddingRequest'],
        1 => ['remove', 'declineRemovingRequest'],
    ];

    public function __construct()
    {
        foreach ($this->rights as $right => $methods) {
            $this->middleware(['auth:api', "requiredUserRight:{$right}"], [
                'only' => $methods,
            ]);
        }
    }

    /**
     * Returns a message when the object is not found.
     *
     * @return string
     */
    abstract protected function getNotFoundMessage();
    
    /**
     * Get all data without limitation.
     *`1
     * @return Response
     */
    public function getAll()
    {
        $this->object = $this->class::with($this->relationships)->get();
        $this->beforeSending();
        return $this->successfulResponse();
    }

    /**
     * Finds model via ID
     *
     * @param integer $id
     * @return Response
     */
    public function getById($id)
    {
        return $this->getByField('id', $id);
    }

    public function getRequestedForAdding()
    {
        $objects = $this->class::with($this->relationships)->where('requested_adding', 1)->get();
        foreach ($objects as $key => $obj) {
            $this->object = $obj;
            $this->beforeSending();
            $objects[$key] = $this->object;
        }
        $this->object = $objects;
        return $this->successfulResponse();
    }

    public function getRequestedForRemoving()
    {
        $objects = $this->class::with($this->relationships)->where('requested_removing', 1)->get();
        foreach ($objects as $key => $obj) {
            $this->object = $obj;
            $this->beforeSending();
            $objects[$key] = $this->object;
        }
        $this->object = $objects;
        return $this->successfulResponse();
    }
}
