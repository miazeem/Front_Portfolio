<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('skills', function (Blueprint $table) {
            $table->id();
            $table->string('category');        // e.g. Frontend
            $table->string('name');            // e.g. React 19
            $table->integer('order')->default(0);
            $table->timestamps();
        });

        // Seed default skills
        $defaults = [
            ['category' => 'Frontend',     'name' => 'React 19',        'order' => 1],
            ['category' => 'Frontend',     'name' => 'Next.js',         'order' => 2],
            ['category' => 'Frontend',     'name' => 'Tailwind CSS',    'order' => 3],
            ['category' => 'Frontend',     'name' => 'Framer Motion',   'order' => 4],
            ['category' => 'Frontend',     'name' => 'TypeScript',      'order' => 5],
            ['category' => 'Backend',      'name' => 'Laravel API',     'order' => 1],
            ['category' => 'Backend',      'name' => 'Node.js',         'order' => 2],
            ['category' => 'Backend',      'name' => 'Express',         'order' => 3],
            ['category' => 'Backend',      'name' => 'REST/GraphQL',    'order' => 4],
            ['category' => 'Backend',      'name' => 'WebSockets',      'order' => 5],
            ['category' => 'Data & Storage','name' => 'PostgreSQL',     'order' => 1],
            ['category' => 'Data & Storage','name' => 'MySQL',          'order' => 2],
            ['category' => 'Data & Storage','name' => 'Redis',          'order' => 3],
            ['category' => 'Data & Storage','name' => 'MongoDB',        'order' => 4],
            ['category' => 'Data & Storage','name' => 'AWS S3',         'order' => 5],
            ['category' => 'DevOps & Cloud','name' => 'Docker',         'order' => 1],
            ['category' => 'DevOps & Cloud','name' => 'GitHub Actions', 'order' => 2],
            ['category' => 'DevOps & Cloud','name' => 'AWS EC2',        'order' => 3],
            ['category' => 'DevOps & Cloud','name' => 'Vercel',         'order' => 4],
            ['category' => 'DevOps & Cloud','name' => 'Linux',          'order' => 5],
        ];

        foreach ($defaults as $row) {
            DB::table('skills')->insert(array_merge($row, [
                'created_at' => now(),
                'updated_at' => now(),
            ]));
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('skills');
    }
};
