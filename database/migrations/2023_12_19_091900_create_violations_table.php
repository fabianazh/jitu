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
        Schema::create('violations', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignId('student_id')->references('nis')->on('students')->onUpdate('cascade')->onDelete('cascade');
            $table->foreignUuid('violation_form_id')->constrained('violation_forms')->onUpdate('cascade')->onDelete('cascade');
            $table->foreignUuid('sanction_id')->constrained('sanctions')->onUpdate('cascade')->onDelete('cascade');
            $table->text('message')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('violations');
    }
};
