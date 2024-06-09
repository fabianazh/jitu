<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Str;

class Student extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $primaryKey = 'nis';
    public $incrementing = false;
    protected $guard = 'student';

    protected $fillable = [
        'nis',
        'name',
        'grade_id',
        'phone',
        'parents_phone',
        'address',
        'gender',
        'photo',
        'date_of_birth',
        'password',
        'status'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'password' => 'hashed',
    ];

    public function grade()
    {
        return $this->belongsTo(Grade::class, 'grade_id', 'id');
    }

    public function violations()
    {
        return $this->hasMany(Violation::class, 'student_id', 'nis');
    }

    public function points()
    {
        return $this->hasOne(StudentPoints::class, 'student_id', 'nis');
    }

    public function getPreviewData()
    {
        return [
            'nis' => $this->nis,
            'name' => $this->name,
            'class_name' => $this->grade->grade . '-' . $this->grade->major->abbreviation . (Grade::where('grade', $this->grade->grade)->where('major_id', $this->grade->major->abbreviation)->count() > 1 ? ('-' . $this->grade->class_number) : null),
            'phone' => $this->phone,
            'address' => $this->address,
            'date_of_birth' => $this->date_of_birth,
            'gender' => $this->gender,
            'points' => $this->points->points,
            'class_id' => $this->grade->id,
            'photo' => $this->photo,
            'status' => $this->status,
        ];
    }

    public function getDetailData()
    {
        return [
            'nis' => $this->nis,
            'name' => $this->name,
            'class_name' => $this->grade->grade . '-' . $this->grade->major->abbreviation . (Grade::where('grade', $this->grade->grade)->where('major_id', $this->grade->major->abbreviation)->count() > 1 ? ('-' . $this->grade->class_number) : null),
            'phone' => $this->phone,
            'parents_phone' => $this->parents_phone,
            'address' => $this->address,
            'date_of_birth' => $this->date_of_birth,
            'gender' => $this->gender,
            'photo' => $this->photo,
            'status' => $this->status,
            'points' => $this->points->points,
            'notifications' => $this->notifications,
            'totalViolations' => $this->violations()->count()
        ];
    }

    public function getActionData()
    {
        return [
            'nis' => $this->nis,
            'name' => $this->name,
            'class_name' => $this->grade->grade . '-' . $this->grade->major->abbreviation . '-' . $this->grade->class_number,
            'phone' => $this->phone,
            'parents_phone' => $this->parents_phone,
            'address' => $this->address,
            'date_of_birth' => $this->date_of_birth,
            'gender' => $this->gender,
            'photo' => $this->photo,
            'status' => $this->status,
            'points' => $this->points->points,
        ];
    }
}
