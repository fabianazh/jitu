<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('violation_forms', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('violation_category_id')->constrained('violation_categories')->onUpdate('cascade')->onDelete('cascade');
            $table->string('description')->length(120)->unique();
            $table->integer('weight');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('violation_forms');
    }
};
