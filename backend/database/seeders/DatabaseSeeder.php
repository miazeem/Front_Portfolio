<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\Setting;
use App\Models\Testimonial;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        /* ── Admin User ──────────────────────────── */
        User::firstOrCreate(
            ['email' => 'admin@portfolio.com'],
            [
                'name'     => 'Portfolio Admin',
                'password' => Hash::make('password'),
            ]
        );

        /* ── Projects ────────────────────────────── */
        $projects = [
            [
                'title'      => 'FinTech Dashboard',
                'problem'    => 'Legacy financial dashboards were clustered and slow, leading to high error rates among analysts.',
                'solution'   => 'Built a reactive, real-time dashboard using WebSockets and Redis caching, reducing data load times by 80%.',
                'image_url'  => 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop',
                'live_url'   => 'https://example.com',
                'github_url' => 'https://github.com',
                'tags'       => ['React', 'Laravel', 'WebSockets', 'Redis'],
                'order'      => 1,
                'is_featured'=> true,
            ],
            [
                'title'      => 'HealthCore Platform',
                'problem'    => 'Patient data was scattered across disparate systems with no unified view for doctors.',
                'solution'   => 'Architected a secure, HIPAA-compliant centralized API resolving data fragmentation for 50,000+ patients.',
                'image_url'  => 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1000&auto=format&fit=crop',
                'live_url'   => 'https://example.com',
                'github_url' => 'https://github.com',
                'tags'       => ['Vue', 'Node.js', 'PostgreSQL', 'Docker'],
                'order'      => 2,
                'is_featured'=> true,
            ],
            [
                'title'      => 'AI Creative Studio',
                'problem'    => 'Users needed a way to dynamically generate and organize design assets at scale without code.',
                'solution'   => 'Integrated Stable Diffusion APIs with a fluid React UI, handling complex job queues with zero downtime.',
                'image_url'  => 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1000&auto=format&fit=crop',
                'live_url'   => 'https://example.com',
                'github_url' => 'https://github.com',
                'tags'       => ['Next.js', 'Python', 'AWS', 'Tailwind CSS'],
                'order'      => 3,
                'is_featured'=> true,
            ],
            [
                'title'      => 'EduSync Platform',
                'problem'    => 'Schools lacked a unified system to track student progress, assignments, and teacher feedback across departments.',
                'solution'   => 'Built a multi-tenant SaaS platform with role-based access, real-time notifications, and a dynamic reporting dashboard serving 200+ schools.',
                'image_url'  => 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop',
                'live_url'   => null,
                'github_url' => null,
                'tags'       => ['React', 'Node.js', 'MongoDB', 'Socket.io'],
                'order'      => 4,
                'is_featured'=> true,
            ],
            [
                'title'      => 'LogiTrack Logistics',
                'problem'    => 'Fleet managers had no real-time visibility into vehicle locations, delivery status, or driver performance metrics.',
                'solution'   => 'Engineered a real-time GPS tracking system with live map views, automated ETA calculations, and driver score analytics using WebSockets.',
                'image_url'  => 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1000&auto=format&fit=crop',
                'live_url'   => null,
                'github_url' => null,
                'tags'       => ['Laravel', 'Vue.js', 'MySQL', 'Google Maps API'],
                'order'      => 5,
                'is_featured'=> true,
            ],
        ];

        foreach ($projects as $project) {
            Project::firstOrCreate(['title' => $project['title']], $project);
        }

        /* ── Testimonials ────────────────────────── */
        $testimonials = [
            [
                'name'       => 'Sarah Chen',
                'role'       => 'CTO',
                'company'    => 'Finova Labs',
                'message'    => 'Working with this developer was a game changer. He wrote code we are still proud of two years later.',
                'avatar_url' => 'https://i.pravatar.cc/100?img=47',
                'order'      => 1,
            ],
            [
                'name'       => 'Marcus Ray',
                'role'       => 'Product Manager',
                'company'    => 'HealthCore',
                'message'    => 'He translated complex product requirements into a scalable system faster than any developer we have hired.',
                'avatar_url' => 'https://i.pravatar.cc/100?img=11',
                'order'      => 2,
            ],
            [
                'name'       => 'Priya Nair',
                'role'       => 'Lead Designer',
                'company'    => 'Pixel Foundry',
                'message'    => 'Rare to find a developer who genuinely cares about UX. He pushed back on bad ideas and made our product beautiful.',
                'avatar_url' => 'https://i.pravatar.cc/100?img=5',
                'order'      => 3,
            ],
            [
                'name'       => 'James O\'Brien',
                'role'       => 'Engineering Manager',
                'company'    => 'CloudOps Inc.',
                'message'    => 'He delivered a robust microservices architecture on time and under budget. The team still talks about how clean the codebase is.',
                'avatar_url' => 'https://i.pravatar.cc/100?img=33',
                'order'      => 4,
            ],
            [
                'name'       => 'Aiko Tanaka',
                'role'       => 'Startup Founder',
                'company'    => 'NeuralBridge',
                'message'    => 'He took our vague MVP idea and shipped a fully working product in six weeks. Absolutely indispensable.',
                'avatar_url' => 'https://i.pravatar.cc/100?img=20',
                'order'      => 5,
            ],
        ];

        foreach ($testimonials as $t) {
            Testimonial::firstOrCreate(['name' => $t['name']], $t);
        }

        /* ── Settings ────────────────────────────── */
        $settings = [
            'contact_email'     => 'miazeem@gmail.com',
            'contact_location'  => 'Available Worldwide · Remote',
            'github_url'        => 'https://github.com/miazeem',
            'linkedin_url'      => 'https://linkedin.com/in/azeemsaas',
            'cv_url'            => 'https://www.cv.com/',
            'profile_image_url' => '/profile.jpg',
        ];

        foreach ($settings as $key => $value) {
            Setting::firstOrCreate(['key' => $key], ['value' => $value]);
        }
    }
}
