<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\Redirect;

class StoreViolationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'student_id' => 'required|exists:students,nis',
            'violation_form_id' => 'required|exists:violation_forms,id',
            'sanction_id' => 'required|exists:sanctions,id',
            'message' => 'nullable|string',
        ];
    }

    public function messages(): array
    {
        return [
            'student_id.required' => 'ID siswa wajib diisi.',
            'student_id.exists' => 'ID siswa tidak valid.',

            'violation_form_id.required' => 'ID formulir pelanggaran wajib diisi.',
            'violation_form_id.exists' => 'ID formulir pelanggaran tidak valid.',

            'sanction_id.required' => 'ID sanksi wajib diisi.',
            'sanction_id.exists' => 'ID sanksi tidak valid.',

            'message.string' => 'Pesan harus berupa teks.',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(
            Redirect::back()->withInput()->withErrors($validator->errors())->with('error', 'Data pelanggaran siswa gagal ditambahkan.')
        );
    }
}
