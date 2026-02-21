<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('problem');
            $table->text('solution');
            $table->string('image_url')->nullable();
            $table->string('live_url')->nullable();
            $table->string('github_url')->nullable();
            $table->json('tags')->nullable();
            $table->integer('order')->default(0);
            $table->boolean('is_featured')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
