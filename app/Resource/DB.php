<?php

namespace App\Resource;

use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;

trait DB
{
    /**
     * Model you want to build on your system.
     * Should be like \App\Model::class
     *
     * @var class
     */
    protected $class = null;

    /**
     * If there is object we searched - here it will be stored.
     *
     * @var object Eloquent model instance
     */
    protected $object = null;

    /**
     * If validation was been succesfully - this will contain all fields with values.
     *
     * @var array|
     */
    protected $validatedData = [];

    /**
     * Should modify current validation rules for exluding sent id
     *
     * @param [type] $exludeId
     * @return void
     */
    protected function modifyValidationRules($exludeId)
    {
    }

    /**
     * Returns Response object stores found object or failed message.
     *
     * @param string $field Field for searching
     * @param mixed $value
     * @return Response
     */
    protected function getByField($field, $value)
    {
        $this->object = $this->class::with($this->relationships)->where($field, $value)->first();
        if ($this->object) {
            $this->beforeSending();
            return $this->successfulResponse();
        }
        return $this->failedResponse();
    }

    /**
     * Should add new Model's object
     *
     * @param Request $request
     * @return Response
     */
    public function add(Request $request)
    {
        $user = Auth::user();

        $this->validatedData = $request->validate($this->validationRules);
        $this->object = new $this->class;
        if ($user->user_group == 3) {
            $this->object->requested_adding = 1;
            $this->object->requested_adding_user = $user->id;
        }

        foreach ($this->validatedData as $key => $value) {
            $this->object->$key = $value;
        }

        $this->beforeInserting();
        $this->object->save();
        $this->afterInserting();

        Log::info(
            $this->object->requested_adding ?
            "User ({$user->id}, '{$user->name}') requested inserting resource '{$this->class}' ({$this->object->id})."
            :
            "User ({$user->id}, '{$user->name}') added resource '{$this->class}' ({$this->object->id})."
        );
        return $this->successfulResponse(201);
    }

    public function acceptAddingRequest($id)
    {
        $user = Auth::user();

        $this->object = $this->class::find($id);
        if (!$this->object) {
            return $this->failedResponse();
        }

        $this->object->requested_adding = 0;
        $this->object->requested_adding_user = $user->id;
        $this->object->save();

        Log::info(
            "User ({$user->id}, '{$user->name}') accepted inserting resource '{$this->class}' ({$this->object->id})."
        );
        $this->afterInsertAccepting();
        return $this->successfulResponse(201);
    }

    public function declineRemovingRequest($id)
    {
        $user = Auth::user();

        $this->object = $this->class::find($id);
        if (!$this->object) {
            return $this->failedResponse();
        }

        $this->object->requested_removing = 0;
        $this->object->requested_removing_user = null;
        $this->object->save();

        Log::info(
            "User ({$user->id}, '{$user->name}') declined removing resource '{$this->class}' ({$this->object->id})."
        );
        return $this->successfulResponse(201);
    }

    /**
     * Edits object from DB
     *
     * @param Request $request
     * @param integer $id Object's ID.
     * @return Response
     */
    public function edit(Request $request, int $id)
    {
        $user = Auth::user();

        $this->modifyValidationRules($id);
        $this->validatedData = $request->validate($this->validationRules);
        $this->object = $this->class::find($id);

        if (!$this->object) {
            return $this->failedResponse();
        }

        foreach ($this->validatedData as $key => $value) {
            $this->object->$key = $value;
        }

        $this->beforeUpdating();
        $this->object->save();
        $this->afterUpdating();

        Log::info(
            "User ({$user->id}, '{$user->name}') edited resource '{$this->class}' ({$this->object->id})."
        );
        return $this->successfulResponse();
    }

    /**
     * Removes object from DB
     *
     * @param Request $request
     * @param integer $id Object's ID.
     * @return Response
     */
    public function remove(Request $request, $id)
    {
        $user = Auth::user();

        $this->object = $this->class::find($id);

        if (!$this->object) {
            return $this->failedResponse();
        }

        $this->beforeRemoving();
        $id = $this->object->id;
        $requestedAdding = $this->object->requested_adding;
        $requestedRemoving = $this->object->requested_removing;
        $this->object->delete();
        $this->afterRemoving();

        $logMessage = [
            "User ({$user->id}, '{$user->name}')",
        ];
        if ($requestedAdding) {
            $logMessage[] = 'declined inserting';
        } elseif ($requestedRemoving) {
            $logMessage[] = 'accepted removing and removed';
        } else {
            $logMessage[] = 'removed';
        }
        $logMessage[] = "resource";
        $logMessage[] = "'{$this->class}' ({$id})";
        $logMessage = implode(' ', $logMessage);
        Log::info($logMessage);
        return response(['message' => 'Ресурс успешно удален'], 200);
    }

    /**
     * Sends request for removing resource
     *
     * @param int $id
     * @return void
     */
    public function sendRequestForRemoving(int $id)
    {
        $user = Auth::user();

        $this->object = $this->class::find($id);

        if (!$this->object) {
            return $this->failedResponse();
        }

        $this->object->requested_removing = 1;
        $this->object->requested_removing_user = $user->id;
        $this->object->save();

        Log::info(
            "User ({$user->id}, '{$user->name}') requested removing resource '{$this->class}' ({$this->object->id})."
        );
        return response(['message' => 'Ресурс запрошен на удаление'], 200);
    }
}
