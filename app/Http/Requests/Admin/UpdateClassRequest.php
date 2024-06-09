<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\Redirect;

class UpdateClassRequest extends FormRequest
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
        $id = $this->route('class')['id'];

        return [
            'id' => 'required|string|min:4|max:10|unique:grades,id,' . $id,
            'grade' => 'required|integer|min:1',
            'major_id' => 'required|exists:majors,id',
            'class_number' => 'nullable|integer',
            'homeroom_teacher' => 'required|string|min:10|max:70|regex:/^[a-zA-Z\s]+$/',
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
            'id.required' => 'ID wajib diisi.',
            'id.string' => 'ID harus berupa teks.',
            'id.min' => 'ID harus terdiri dari minimal :min karakter.',
            'id.max' => 'ID tidak boleh lebih dari :max karakter.',
            'id.unique' => 'ID sudah digunakan.',

            'grade.required' => 'Kelas wajib diisi.',
            'grade.integer' => 'Kelas harus berupa bilangan bulat.',
            'grade.min' => 'Kelas minimal harus :min.',

            'major_id.required' => 'ID Jurusan wajib diisi.',
            'major_id.exists' => 'ID Jurusan tidak valid.',

            'class_number.integer' => 'Nomor kelas harus berupa bilangan bulat.',

            'homeroom_teacher.required' => 'Nama Guru Kelas wajib diisi.',
            'homeroom_teacher.string' => 'Nama Guru Kelas harus berupa teks.',
            'homeroom_teacher.min' => 'Nama Guru Kelas minimal harus :min karakter.',
            'homeroom_teacher.max' => 'Nama Guru Kelas tidak boleh lebih dari :max karakter.',
            'homeroom_teacher.regex' => 'Nama Guru Kelas hanya boleh mengandung huruf dan spasi.',
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
            Redirect::back()->withInput()->withErrors($validator->errors())->with('error', 'Data kelas gagal diperbarui.')
        );
    }
}
