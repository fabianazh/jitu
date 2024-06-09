<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

class Violation extends Model
{
    use HasFactory;

    public $incrementing = false;
    protected $keyType = 'uuid';

    protected $fillable = ['id', 'student_id', 'violation_form_id', 'sanction_id', 'message'];

    public function student()
    {
        return $this->belongsTo(Student::class, 'student_id', 'nis');
    }

    public function violationForm()
    {
        return $this->belongsTo(ViolationForm::class, 'violation_form_id');
    }

    public function sanction()
    {
        return $this->belongsTo(Sanction::class, 'sanction_id');
    }

    public function getPreviewData()
    {
        return [
            'id' => $this->id,
            'student_name' => $this->student->name,
            'student_status' => $this->student->status,
            'student_class' => $this->student->grade->grade . '-' . $this->student->grade->major->abbreviation . (Grade::where('grade', $this->student->grade->grade)->where('major_id', $this->student->grade->major->abbreviation)->count() > 1 ? ('-' . $this->student->grade->class_number) : null),
            'violation_form' => $this->violationForm->description,
            'violation_category' => $this->violationForm->violationCategory->category,
            'sanction' => $this->sanction->sanction,
            'message' => $this->message,
            'created_at' => $this->created_at->diffForHumans(),
            'date' => \Carbon\Carbon::parse($this->created_at)->format('d M, Y')
        ];
    }

    public function getDetailData()
    {
        return [
            'id' => $this->id,
            'student_nis' => $this->student['nis'],
            'student_name' => $this->student->name,
            'student_status' => $this->student->status,
            'student_class' => $this->student->grade->grade . '-' . $this->student->grade->major->abbreviation . (Grade::where('grade', $this->student->grade->grade)->where('major_id', $this->student->grade->major->abbreviation)->count() > 1 ? ('-' . $this->student->grade->class_number) : null),
            'violation_form' => $this->violationForm->description,
            'violation_category' => $this->violationForm->violationCategory->category,
            'sanction' => $this->sanction->sanction,
            'message' => $this->message,
            'violation_form_id' => $this->violationForm->id,
            'weight' => $this->violationForm->weight,
            'sanction_id' => $this->sanction->id,
            'date' => \Carbon\Carbon::parse($this->created_at)->format('d M, Y'),
            'student_points' => $this->student->points->points,
            'student_gender' => $this->student->gender,
            'student_photo' => $this->student->photo,
        ];
    }

    public function getActionData()
    {
        return [
            'id' => $this->id,
            'student_nis' => $this->student['nis'],
            'student_name' => $this->student->name,
            'student_status' => $this->student->status,
            'student_class' => $this->student->grade->id,
            'violation_form' => $this->violationForm->description,
            'violation_category' => $this->violationForm->violationCategory->category,
            'sanction' => $this->sanction->sanction,
            'message' => $this->message,
            'violation_form_id' => $this->violationForm->id,
            'weight' => $this->violationForm->weight,
            'sanction_id' => $this->sanction->id,
            'date' => \Carbon\Carbon::parse($this->created_at)->format('d M, Y'),
            'student_points' => $this->student->points->points,
            'student_gender' => $this->student->gender,
        ];
    }
}
