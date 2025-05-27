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
        Schema::create('media', function (Blueprint $table) {
            $table->id();
            $table->foreignId('event_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('set null');
            $table->boolean('is_guest')->default(false);
            $table->enum('type', ['file', 'text'])->default('file');
            $table->string('file_path')->nullable();
            $table->string('file_type')->nullable();
            $table->unsignedBigInteger('file_size')->nullable();
            $table->text('text_content')->nullable();
            $table->string('background_image')->nullable();
            $table->string('font_color')->nullable();
            $table->string('caption_text')->nullable();
            $table->string('caption_name')->nullable();
            $table->timestamps();
            $table->index('type');
            $table->index('event_id');
            $table->index('user_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('media');
    }
};
