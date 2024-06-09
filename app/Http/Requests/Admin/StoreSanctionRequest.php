<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\Redirect;

class StoreSanctionRequest extends FormRequest
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
            'criteria' => 'required|string|min:10|max:100|unique:sanctions,criteria',
            'weight_from' => 'required|integer|unique:sanctions,weight_from',
            'weight_to' => 'required|integer|unique:sanctions,weight_to',
            'sanction' => 'required|string|min:10|max:90|unique:sanctions,sanction',
        ];
    }


    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array
     */
    public function messages(): array
    {
        return [
            'criteria.required' => 'Kriteria wajib diisi.',
            'criteria.string' => 'Kriteria harus berupa teks.',
            'criteria.min' => 'Kriteria harus berisi lebih dari :min karakter.',
            'criteria.max' => 'Kriteria tidak boleh lebih dari :max karakter.',
            'criteria.unique' => 'Kriteria sudah digunakan.',

            'weight_from.required' => 'Bobot awal wajib diisi.',
            'weight_from.integer' => 'Bobot awal harus berupa bilangan bulat.',
            'weight_from.unique' => 'Bobot awal sudah digunakan.',

            'weight_to.required' => 'Bobot akhir wajib diisi.',
            'weight_to.integer' => 'Bobot akhir harus berupa bilangan bulat.',
            'weight_to.unique' => 'Bobot akhir sudah digunakan.',

            'sanction.required' => 'Sanksi wajib diisi.',
            'sanction.string' => 'Sanksi harus berupa teks.',
            'sanction.min' => 'Sanksi harus berisi lebih dari :min karakter.',
            'sanction.max' => 'Sanksi tidak boleh lebih dari :max karakter.',
            'sanction.unique' => 'Sanksi sudah digunakan.',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(
            Redirect::back()->withInput()->withErrors($validator->errors())->with('error', 'Data sanksi gagal ditambahkan.')
        );
    }
}
