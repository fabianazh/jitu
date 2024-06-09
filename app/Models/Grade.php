<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Grade extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'grade',
        'major_id',
        'class_number',
        'homeroom_teacher'
    ];

    public $incrementing = false;
    protected $keyType = 'uuid';

    public function major()
    {
        return $this->belongsTo(Major::class);
    }

    public function students()
    {
        return $this->hasMany(Student::class);
    }

    public function getPreviewData()
    {
        return [
            'id' => $this->id,
            'major' => $this->major->name,
            'class_name' => $this->grade . '-' . $this->major->abbreviation . ($this->students()->count() > 1 ? ('-' . $this->class_number) : null),
            'class_number' => $this->class_number,
            'total_students' => $this->students()->count(),
            'homeroom_teacher' => $this->homeroom_teacher
        ];
    }

    public function getDetailData()
    {
        return [
            'id' => $this->id,
            'grade' => $this->grade,
            'major' => $this->major->name . ' (' . $this->major->abbreviation . ')',
            'major_id' => $this->major->id,
            'class_name' => $this->grade . '-' . $this->major->abbreviation . ($this->students()->count() > 1 ? ('-' . $this->class_number) : null),
            'class_number' => $this->class_number,
            'total_students' => $this->students()->count(),
            'homeroom_teacher' => $this->homeroom_teacher
        ];
    }

    public function getActionData()
    {
        return [
            'id' => $this->id,
            'grade' => $this->grade,
            'major' => $this->major->name . ' (' . $this->major->abbreviation . ')',
            'major_id' => $this->major->id,
            'class_name' => $this->grade . '-' . $this->major->abbreviation . ($this->students()->count() > 1 ? ('-' . $this->class_number) : null),
            'class_number' => $this->class_number,
            'homeroom_teacher' => $this->homeroom_teacher
        ];
    }
}
