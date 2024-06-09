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
        Schema::create('students', function (Blueprint $table) {
            $table->id('nis')->length(12);
            $table->foreignUuid('grade_id')->constrained('grades')->onUpdate('cascade')->onDelete('cascade');
            $table->string('name')->length(60);
            $table->string('phone')->length(22)->unique();
            $table->string('parents_phone')->length(22)->unique();
            $table->text('address')->nullable();
            $table->date('date_of_birth');
            $table->enum('gender', ['Laki-Laki', 'Perempuan']);
            $table->string('photo')->nullable()->default('img/avatar/default-avatar.jpg');
            $table->set('status', ['Aktif', 'Lulus', 'Dropout'])->default('Aktif');
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('students');
    }
};
