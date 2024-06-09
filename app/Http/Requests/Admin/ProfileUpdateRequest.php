<?php

namespace App\Http\Requests\Admin;

use App\Models\Admin;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\Redirect;

class ProfileUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:90'],
            'username' => ['required', 'string', 'lowercase', 'max:20', Rule::unique(Admin::class)->ignore($this->user()->id)],
            'photo' => 'nullable|file|image',
            'password' => 'required|string|current_password'
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'name.required' => 'Nama wajib diisi.',
            'name.string' => 'Nama harus berupa teks.',
            'name.max' => 'Nama tidak boleh lebih dari :max karakter.',

            'username.required' => 'Username wajib diisi.',
            'username.string' => 'Username harus berupa teks.',
            'username.max' => 'Username tidak boleh lebih dari :max karakter.',
            'username.unique' => 'Username sudah digunakan.',

            'photo.file' => 'Foto harus berupa file.',
            'photo.image' => 'File yang diunggah harus berupa gambar.',

            'password.required' => 'Password wajib diisi.',
            'password.string' => 'Password harus berupa teks.',
            'password.current_password' => 'Password tidak sesuai dengan autentikasi.',
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

    /**
     * Handle a failed validation attempt.
     *
     * @param  \Illuminate\Contracts\Validation\Validator  $validator
     * @return void
     */
    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(
            Redirect::back()->withInput()->withErrors($validator->errors())->with('error', 'Profil gagal diperbarui.')
        );
    }
}
