<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\Redirect;

class UpdateStudentRequest extends FormRequest
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
        $nis = $this->route('student')['nis'];

        return [
            'nis' => 'required|min:12|max:16|unique:students,nis,' . $nis . ',nis',
            'name' => 'required|string|max:60',
            'grade_id' => 'required|string|exists:grades,id',
            'date_of_birth' => 'required|date',
            'gender' => 'required|string|in:Laki-Laki,Perempuan',
            'address' => 'nullable|string|max:255',
            'photo' => 'nullable',
            'phone' => 'nullable|string|min:12|max:20|unique:students,phone,' . $nis . ',nis',
            'parents_phone' => 'nullable|string|min:12|max:20|unique:students,parents_phone,' . $nis . ',nis',
            'status' => 'required|string|in:Aktif,Lulus,Dropout'
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
            'nis.integer' => 'NIS harus berupa bilangan bulat.',
            'nis.min' => 'NIS minimal harus :min digit.',
            'nis.max' => 'NIS tidak boleh lebih dari :max digit.',
            'nis.unique' => 'NIS sudah digunakan.',

            'name.required' => 'Nama wajib diisi.',
            'name.string' => 'Nama harus berupa teks.',
            'name.max' => 'Nama tidak boleh lebih dari :max karakter.',

            'grade_id.required' => 'ID Kelas wajib diisi.',
            'grade_id.string' => 'ID Kelas harus berupa teks.',
            'grade_id.exists' => 'ID Kelas tidak valid.',

            'date_of_birth.required' => 'Tanggal Lahir wajib diisi.',
            'date_of_birth.date' => 'Format tanggal lahir tidak valid.',

            'gender.required' => 'Jenis Kelamin wajib diisi.',
            'gender.string' => 'Jenis Kelamin harus berupa teks.',
            'gender.in' => 'Jenis Kelamin harus salah satu dari: Laki-Laki, Perempuan.',

            'address.string' => 'Alamat harus berupa teks.',
            'address.max' => 'Alamat tidak boleh lebih dari :max karakter.',

            'photo.file' => 'Foto harus berupa file.',
            'photo.image' => 'File yang diunggah harus berupa gambar.',

            'phone.string' => 'Nomor telepon harus berupa teks.',
            'phone.min' => 'Nomor telepon harus terdiri dari minimal :min karakter.',
            'phone.max' => 'Nomor telepon tidak boleh lebih dari :max karakter.',
            'phone.unique' => 'Nomor telepon sudah digunakan.',

            'parents_phone.string' => 'Nomor telepon orang tua harus berupa teks.',
            'parents_phone.min' => 'Nomor telepon orang tua harus terdiri dari minimal :min karakter.',
            'parents_phone.max' => 'Nomor telepon orang tua tidak boleh lebih dari :max karakter.',
            'parents_phone.unique' => 'Nomor telepon orang tua sudah digunakan.',

            'status.required' => 'Status siswa wajib diisi.',
            'status.string' => 'Status siswa harus berupa teks.',
            'status.in' => 'Status siswa harus salah satu dari: Aktif, Lulus, Dropout.',
        ];
    }

}
