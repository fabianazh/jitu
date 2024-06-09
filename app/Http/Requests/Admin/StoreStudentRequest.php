<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\Redirect;

class StoreStudentRequest extends FormRequest
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
     * @return array
     */
    public function rules(): array
    {
        return [
            'nis' => 'required|string|min:12|max:16|unique:students,nis',
            'name' => 'required|string|max:60|regex:/^[a-zA-Z\s]+$/',
            'class_name' => 'required|string|max:11',
            'date_of_birth' => 'required|date',
            'gender' => 'required|string',
            'address' => 'nullable|string|max:255',
            'photo' => 'nullable|file|image',
            'phone' => 'required|string|min:12|max:20|unique:students,phone',
            'parents_phone' => 'nullable|string|min:12|max:20|unique:students,parents_phone',
            'password' => 'required|string|min:8|max:16',
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
            'nis.required' => 'NIS wajib diisi.',
            'nis.string' => 'NIS harus berupa teks.',
            'nis.min' => 'NIS harus terdiri dari minimal :min karakter.',
            'nis.max' => 'NIS tidak boleh lebih dari :max karakter.',
            'nis.unique' => 'NIS sudah digunakan.',

            'name.required' => 'Nama wajib diisi.',
            'name.string' => 'Nama harus berupa teks.',
            'name.max' => 'Nama tidak boleh lebih dari :max karakter.',
            'name.regex' => 'Nama hanya boleh mengandung huruf dan spasi.',

            'class_name.required' => 'Kelas wajib diisi.',
            'class_name.string' => 'Kelas harus berupa teks.',
            'class_name.max' => 'Kelas tidak boleh lebih dari :max karakter.',

            'date_of_birth.required' => 'Tanggal Lahir wajib diisi.',
            'date_of_birth.date' => 'Format tanggal lahir tidak valid.',

            'gender.required' => 'Jenis Kelamin wajib diisi.',
            'gender.string' => 'Jenis Kelamin harus berupa teks.',

            'address.string' => 'Alamat harus berupa teks.',
            'address.max' => 'Alamat tidak boleh lebih dari :max karakter.',

            'photo.file' => 'Photo harus berupa file.',
            'photo.image' => 'File yang diunggah harus berupa gambar.',

            'phone.required' => 'Nomor telepon siswa harus diisi.',
            'phone.string' => 'Nomor telepon siswa harus berupa teks.',
            'phone.min' => 'Nomor telepon siswa harus terdiri dari minimal :min karakter.',
            'phone.max' => 'Nomor telepon siswa tidak boleh lebih dari :max karakter.',
            'phone.unique' => 'Nomor telepon siswa sudah digunakan.',

            'parents_phone.string' => 'Nomor telepon orang tua harus berupa teks.',
            'parents_phone.min' => 'Nomor telepon orang tua harus terdiri dari minimal :min karakter.',
            'parents_phone.max' => 'Nomor telepon orang tua tidak boleh lebih dari :max karakter.',
            'parents_phone.unique' => 'Nomor telepon orang tua sudah digunakan.',

            'password.required' => 'Password wajib diisi.',
            'password.string' => 'Password harus berupa teks.',
            'password.min' => 'Password harus terdiri dari minimal :min karakter.',
            'password.max' => 'Password tidak boleh lebih dari :max karakter.',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(
            Redirect::back()->withInput()->withErrors($validator->errors())->with('error', 'Data siswa gagal ditambahkan.')
        );
    }
}
