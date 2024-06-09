<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\Redirect;

class UpdatePasswordRequest extends FormRequest
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
            'current_password' => ['required', 'string', 'current_password'],
            'password' => ['required', 'string', 'min:8', 'max:16', Password::defaults(), 'confirmed'],
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
            'current_password.required' => 'Kolom Password Saat Ini wajib diisi.',
            'current_password.string' => 'Kolom Password Saat Ini harus berupa teks.',
            'current_password.current_password' => 'Password Saat Ini tidak valid.',

            'password.required' => 'Kolom Password Baru wajib diisi.',
            'password.string' => 'Kolom Password Baru harus berupa teks.',
            'password.min' => 'Password Baru harus memiliki panjang minimal :min karakter.',
            'password.max' => 'Password Baru harus memiliki panjang maksimal :max karakter.',
            'password.confirmed' => 'Konfirmasi Password Baru tidak sesuai.',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(
            Redirect::back()->withInput()->withErrors($validator->errors())->with('error', 'Password gagal diperbarui.')
        );
    }
}
