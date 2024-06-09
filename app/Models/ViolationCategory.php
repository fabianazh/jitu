<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ViolationCategory extends Model
{
    use HasFactory;

    public $incrementing = false;
    protected $keyType = 'uuid';
    public $timestamps = false;

    public function violations()
    {
        return $this->hasMany(ViolationForm::class);
    }

    public function getPreviewData()
    {
        return [
            'id' => $this->id,
            'category' => $this->category,
        ];
    }

    public function getDetailData()
    {
        return [
            'id' => $this->id,
            'category' => $this->category,
            'violations' => $this->violations
        ];
    }
}
