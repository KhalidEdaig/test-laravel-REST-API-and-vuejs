<?php

namespace App\Http\Requests\employees;

use Illuminate\Foundation\Http\FormRequest;

class CreateOrUpdateEmployee extends FormRequest
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
            'firtsname' => 'required|min:3|max:70',
            'lastsname' => 'required|min:3|max:70',
            'email' => 'required|email|unique:employees',
            'phone' => 'required|min:10',
            'entreprise_id' => 'required|integer|exists:entreprises,id',
        ];
    }
}
