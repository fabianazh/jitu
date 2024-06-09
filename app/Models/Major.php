<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Major extends Model
{
    use HasFactory;

    public $incrementing = false;
    protected $keyType = 'uuid';

    protected $fillable = ['id', 'name', 'abbreviation', 'head_of_program'];

    public function classes(): HasMany
    {
        return $this->hasMany(Grade::class);
    }

    public function getPreviewData(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'abbreviation' => $this->abbreviation,
            'head_of_program' => $this->head_of_program,
            'total_classes' => $this->classes()->count()
        ];
    }

    public function getDetailData(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'abbreviation' => $this->abbreviation,
            'head_of_program' => $this->head_of_program,
            'total_classes' => $this->classes()->count()
        ];
    }
}
