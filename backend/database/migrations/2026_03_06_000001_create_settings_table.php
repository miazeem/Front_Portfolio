<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique();
            $table->text('value')->nullable();
            $table->timestamps();
        });

        // Seed default contact info
        DB::table('settings')->insert([
            ['key' => 'contact_email',    'value' => 'hello@portfolio.studio', 'created_at' => now(), 'updated_at' => now()],
            ['key' => 'contact_location', 'value' => 'Available Worldwide · Remote', 'created_at' => now(), 'updated_at' => now()],
            ['key' => 'github_url',       'value' => 'https://github.com', 'created_at' => now(), 'updated_at' => now()],
            ['key' => 'linkedin_url',     'value' => '', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }

    public function down(): void
    {
        Schema::dropIfExists('settings');
    }
};
