<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Skill;
use Illuminate\Http\Request;

class SkillController extends Controller
{
    /* ─── Public: grouped by category ─── */
    public function index()
    {
        $grouped = Skill::orderBy('category')->orderBy('order')->get()
            ->groupBy('category')
            ->map(fn($items) => $items->pluck('name'));

        return response()->json($grouped);
    }

    /* ─── Admin: flat list ─── */
    public function adminIndex()
    {
        return response()->json(Skill::orderBy('category')->orderBy('order')->get());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'category' => 'required|string|max:100',
            'name'     => 'required|string|max:100',
            'order'    => 'nullable|integer',
        ]);
        return response()->json(Skill::create($data), 201);
    }

    public function update(Request $request, Skill $skill)
    {
        $data = $request->validate([
            'category' => 'string|max:100',
            'name'     => 'string|max:100',
            'order'    => 'nullable|integer',
        ]);
        $skill->update($data);
        return response()->json($skill);
    }

    public function destroy(Skill $skill)
    {
        $skill->delete();
        return response()->json(null, 204);
    }
}
