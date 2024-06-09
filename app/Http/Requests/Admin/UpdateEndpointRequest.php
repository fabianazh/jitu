<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\Redirect;

class UpdateEndpointRequest extends FormRequest
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
            'endpoint' => 'required|string|min:4|max:16',
            'password' => 'required|string|password_match'
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
            'endpoint.required' => 'Endpoint wajib diisi.',
            'endpoint.string' => 'Endpoint harus berupa teks.',
            'endpoint.min' => 'Endpoint harus terdiri dari minimal :min karakter.',
            'endpoint.max' => 'Endpoint tidak boleh lebih dari :max karakter.',

            'password.required' => 'Password wajib diisi.',
            'password.string' => 'Password harus berupa teks.',
            'password.password_match' => 'Password tidak sesuai dengan autentikasi.',
        ];
    }


    /**
     * Set custom validation messages for attributes.
     *
     * @return array<string, string>
     */
    public function attributes(): array
    {
        return [
            'password' => 'password',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(
            Redirect::back()->withInput()->withErrors($validator->errors())->with('error', 'Endpoint autentikasi gagal diperbarui.')
        );
    }
}
