<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    /* ─── Public ─────────────────────────────── */

    public function index()
    {
        $projects = Project::where('is_featured', true)
            ->orderBy('order')
            ->get();

        return response()->json($projects);
    }

    /* ─── Admin ───────────────────────────────── */

    public function adminIndex()
    {
        return response()->json(Project::orderBy('order')->get());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title'      => 'required|string|max:255',
            'problem'    => 'required|string',
            'solution'   => 'required|string',
            'image_url'  => 'nullable|url',
            'live_url'   => 'nullable|url',
            'github_url' => 'nullable|url',
            'tags'       => 'nullable|array',
            'order'      => 'nullable|integer',
            'is_featured'=> 'boolean',
        ]);

        return response()->json(Project::create($data), 201);
    }

    public function update(Request $request, Project $project)
    {
        $data = $request->validate([
            'title'      => 'string|max:255',
            'problem'    => 'string',
            'solution'   => 'string',
            'image_url'  => 'nullable|url',
            'live_url'   => 'nullable|url',
            'github_url' => 'nullable|url',
            'tags'       => 'nullable|array',
            'order'      => 'nullable|integer',
            'is_featured'=> 'boolean',
        ]);

        $project->update($data);

        return response()->json($project);
    }

    public function destroy(Project $project)
    {
        $project->delete();

        return response()->json(['message' => 'Project deleted.']);
    }
}
