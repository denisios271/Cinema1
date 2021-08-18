<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use App\Eloquents\PostVote;

class CreatePostVoteRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return Auth::check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $minVote = PostVote::MIN_VOTE;
        $maxVote = PostVote::MAX_VOTE;
        return [
            'post_id' => 'required|integer|exists:posts,id',
            'vote' => "required|integer|min:{$minVote}|max:{$maxVote}",
        ];
    }
}
