<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\Redirect;

class UpdateMajorRequest extends FormRequest
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
        $id = $this->route('major')['id'];

        return [
            'name' => 'required|string|min:20|max:90|regex:/^[a-zA-Z\s]+$/|unique:majors,name,' . $id,
            'abbreviation' => 'required|string|min:2|max:8|regex:/^[a-zA-Z\s]+$/|unique:majors,abbreviation,' . $id,
            'head_of_program' => 'required|string|max:70|regex:/^[a-zA-Z\s]+$/',
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
            'name.required' => 'Nama jurusan wajib diisi.',
            'name.string' => 'Nama jurusan harus berupa teks.',
            'name.min' => 'Nama jurusan minimal harus :min karakter.',
            'name.max' => 'Nama jurusan tidak boleh lebih dari :max karakter.',
            'name.unique' => 'Nama jurusan sudah digunakan.',
            'name.regex' => 'Nama jurusan hanya boleh mengandung huruf dan spasi.',

            'abbreviation.required' => 'Singkatan jurusan wajib diisi.',
            'abbreviation.string' => 'Singkatan jurusan harus berupa teks.',
            'abbreviation.min' => 'Singkatan jurusan minimal harus :min karakter.',
            'abbreviation.max' => 'Singkatan jurusan tidak boleh lebih dari :max karakter.',
            'abbreviation.unique' => 'Singkatan jurusan sudah digunakan.',
            'abbreviation.regex' => 'Singkatan jurusan hanya boleh mengandung huruf dan spasi.',

            'head_of_program.required' => 'Nama Ketua Program wajib diisi.',
            'head_of_program.string' => 'Nama Ketua Program harus berupa teks.',
            'head_of_program.max' => 'Nama Ketua Program tidak boleh lebih dari :max karakter.',
            'head_of_program.regex' => 'Nama Ketua Program hanya boleh mengandung huruf dan spasi.',
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
            Redirect::back()->withInput()->withErrors($validator->errors())->with('error', 'Data jurusan gagal diperbarui.')
        );
    }
}
