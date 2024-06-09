<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\Redirect;

class StoreViolationFormRequest extends FormRequest
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
            'violation_category_id' => 'required|exists:violation_categories,id',
            'description' => 'required|string|max:120|unique:violation_forms,description',
            'weight' => 'required|integer',
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
            'violation_category_id.required' => 'Kategori pelanggaran wajib dipilih.',
            'violation_category_id.exists' => 'Kategori pelanggaran tidak valid.',

            'description.required' => 'Deskripsi wajib diisi.',
            'description.string' => 'Deskripsi harus berupa teks.',
            'description.max' => 'Deskripsi tidak boleh lebih dari :max karakter.',
            'description.unique' => 'Deskripsi sudah digunakan.',

            'weight.required' => 'Bobot wajib diisi.',
            'weight.integer' => 'Bobot harus berupa bilangan bulat.',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(
            Redirect::back()->withInput()->withErrors($validator->errors())->with('error', 'Bentuk pelanggaran gagal ditambahkan.')
        );
    }
}
