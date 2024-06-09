<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\Redirect;

class StoreMessageRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|min:4|max:60',
            'email' => 'required|email',
            'message' => 'required|string|min:1'
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [

            'name.required' => 'Nama wajib diisi.',
            'name.string' => 'Nama harus berupa teks.',
            'name.min' => 'Nama minimal harus terdiri dari :min karakter.',
            'name.max' => 'Nama tidak boleh lebih dari :max karakter.',

            'email.required' => 'Email wajib diisi.',
            'email.email' => 'Email tidak valid.',

            'message.required' => 'Pesan wajib diisi.',
            'message.string' => 'Pesan harus berupa teks.',
            'message.min' => 'Pesan harus terdiri dari :max karakter.',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(
            Redirect::back()->withInput()->withErrors($validator->errors())->with('error', 'Pesan gagal ditambahkan.')
        );
    }
}
