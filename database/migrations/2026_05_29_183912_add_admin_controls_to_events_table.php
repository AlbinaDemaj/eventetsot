<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('events', function (Blueprint $table) {
            if (!Schema::hasColumn('events', 'is_active')) {
                $table->boolean('is_active')->default(true)->after('is_public');
            }

            if (!Schema::hasColumn('events', 'is_premium')) {
                $table->boolean('is_premium')->default(false)->after('is_active');
            }

            if (!Schema::hasColumn('events', 'premium_until')) {
                $table->timestamp('premium_until')->nullable()->after('is_premium');
            }
        });
    }

    public function down(): void
    {
        Schema::table('events', function (Blueprint $table) {
            if (Schema::hasColumn('events', 'premium_until')) {
                $table->dropColumn('premium_until');
            }

            if (Schema::hasColumn('events', 'is_premium')) {
                $table->dropColumn('is_premium');
            }

            if (Schema::hasColumn('events', 'is_active')) {
                $table->dropColumn('is_active');
            }
        });
    }
};