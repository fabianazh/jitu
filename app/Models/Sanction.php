<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sanction extends Model
{
    use HasFactory;

    public $incrementing = false;
    protected $keyType = 'uuid';

    protected $fillable = ['id', 'sanction', 'weight_from', 'weight_to', 'criteria'];

    public function violations()
    {
        return $this->hasMany(Violation::class);
    }

    public function getPreviewData()
    {
        return [
            'id' => $this->id,
            'criteria' => $this->criteria,
            'weight_from' => $this->weight_from,
            'weight_to' => $this->weight_to,
            'sanction' => $this->sanction,
            'violations' => $this->violations,
        ];
    }

    public function getDetailData()
    {
        return [
            'id' => $this->id,
            'criteria' => $this->criteria,
            'weight_from' => $this->weight_from,
            'weight_to' => $this->weight_to,
            'sanction' => $this->sanction,
            'totalViolations' => $this->violations()->count(),
        ];
    }
}
