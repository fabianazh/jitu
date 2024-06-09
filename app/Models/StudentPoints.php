<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentPoints extends Model
{
    use HasFactory;

    protected $fillable = ['student_id', 'points'];

    public function student()
    {
        return $this->belongsTo(Student::class, 'student_id', 'nis');
    }
}
