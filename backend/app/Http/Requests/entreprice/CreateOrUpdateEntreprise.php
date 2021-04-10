<?php

namespace App\Http\Requests\entreprice;

use Illuminate\Foundation\Http\FormRequest;

class CreateOrUpdateEntreprise extends FormRequest
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
            'name' => 'required|min:3|max:70',
            'email' => 'required|email|unique:entreprises',
            //'file' => 'required|mimes:jpeg,bmp,png|size:10000'
        ];
    }
}
