<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->date('event_date');
            $table->string('code')->unique();
            $table->text('qr_code')->nullable();
            $table->text('logo')->nullable();
            $table->enum('locale', ['en', 'sq'])->default('en');
            $table->text('note')->nullable();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->enum('type', ['wedding', 'birthday', 'party'])->default('wedding');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
