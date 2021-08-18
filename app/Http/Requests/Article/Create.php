<?php

namespace App\Http\Requests\Article;

use Illuminate\Foundation\Http\FormRequest;

class Create extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'title' => 'required|string|max:255',
            'content' => 'required|string|min:50|max:3000',
            'uri' => 'required|string|max:255|unique:articles|regex:/^[a-z\-0-9]+$/',
            'hashtags' => 'required|array|min:3|max:255',
        ];
    }
}
