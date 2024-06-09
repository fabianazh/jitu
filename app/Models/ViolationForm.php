<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ViolationForm extends Model
{
    use HasFactory;

    public $incrementing = false;
    protected $keyType = 'uuid';

    protected $fillable = ['id', 'violation_category_id', 'weight', 'description'];

    public function violationCategory()
    {
        return $this->belongsTo(ViolationCategory::class, 'violation_category_id');
    }

    public function violations()
    {
        return $this->hasMany(Violation::class);
    }

    public function getPreviewData()
    {
        return [
            'id' => $this->id,
            'description' => $this->description,
            'weight' => $this->weight,
            'violation_category' => $this->violationCategory->category,
            'violation_category_id' => $this->violationCategory->id,
            'totalViolations' => (Violation::where('violation_form_id', $this->id)->count())
        ];
    }

    public function getDetailData()
    {
        return [
            'id' => $this->id,
            'description' => $this->description,
            'weight' => $this->weight,
            'violation_category' => $this->violationCategory->category,
            'violation_category_id' => $this->violationCategory->id,
            'totalViolations' => (Violation::where('violation_form_id', $this->id)->count())
        ];
    }

}
