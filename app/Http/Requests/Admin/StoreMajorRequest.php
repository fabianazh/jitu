<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\Redirect;

class StoreMajorRequest extends FormRequest
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
            'id' => 'required|string|unique:majors,id',
            'name' => 'required|string|unique:majors,name|min:20|max:90|regex:/^[a-zA-Z\s]+$/',
            'abbreviation' => 'required|string|regex:/^[a-zA-Z\s]+$/|unique:majors,abbreviation|min:2|max:8',
            'head_of_program' => 'required|string|min:10|max:70|regex:/^[a-zA-Z\s]+$/',
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
            'id.required' => 'ID wajib diisi.',
            'id.string' => 'ID harus berupa teks.',
            'id.unique' => 'ID sudah digunakan.',

            'name.required' => 'Nama jurusan wajib diisi.',
            'name.string' => 'Nama jurusan harus berupa teks.',
            'name.unique' => 'Nama jurusan sudah digunakan.',
            'name.min' => 'Nama jurusan minimal harus terdiri dari :min karakter.',
            'name.max' => 'Nama jurusan tidak boleh lebih dari :max karakter.',
            'name.regex' => 'Nama jurusan hanya boleh mengandung huruf dan spasi.',

            'abbreviation.required' => 'Singkatan jurusan wajib diisi.',
            'abbreviation.string' => 'Singkatan jurusan harus berupa teks.',
            'abbreviation.unique' => 'Singkatan jurusan sudah digunakan.',
            'abbreviation.min' => 'Singkatan jurusan minimal harus terdiri dari :min karakter.',
            'abbreviation.max' => 'Singkatan jurusan tidak boleh lebih dari :max karakter.',
            'abbreviation.regex' => 'Singkatan jurusan hanya boleh mengandung huruf dan spasi.',

            'head_of_program.required' => 'Nama Ketua Program wajib diisi.',
            'head_of_program.string' => 'Nama Ketua Program harus berupa teks.',
            'head_of_program.min' => 'Nama Ketua Program harus terdiri dari :min karakter.',
            'head_of_program.max' => 'Nama Ketua Program tidak boleh lebih dari :max karakter.',
            'head_of_program.regex' => 'Nama Ketua Program hanya boleh mengandung huruf dan spasi.',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(
            Redirect::back()->withInput()->withErrors($validator->errors())->with('error', 'Data jurusan gagal ditambahkan.')
        );
    }
}
