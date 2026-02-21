<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Testimonial;
use Illuminate\Http\Request;

class TestimonialController extends Controller
{
    /* ─── Public ─────────────────────────────── */

    public function index()
    {
        return response()->json(Testimonial::orderBy('order')->get());
    }

    /* ─── Admin ───────────────────────────────── */

    public function store(Request $request)
    {
        $data = $request->validate([
            'name'       => 'required|string|max:255',
            'role'       => 'required|string|max:255',
            'company'    => 'nullable|string|max:255',
            'message'    => 'required|string',
            'avatar_url' => 'nullable|url',
            'order'      => 'nullable|integer',
        ]);

        return response()->json(Testimonial::create($data), 201);
    }

    public function update(Request $request, Testimonial $testimonial)
    {
        $data = $request->validate([
            'name'       => 'string|max:255',
            'role'       => 'string|max:255',
            'company'    => 'nullable|string|max:255',
            'message'    => 'string',
            'avatar_url' => 'nullable|url',
            'order'      => 'nullable|integer',
        ]);

        $testimonial->update($data);

        return response()->json($testimonial);
    }

    public function destroy(Testimonial $testimonial)
    {
        $testimonial->delete();

        return response()->json(['message' => 'Testimonial deleted.']);
    }
}
