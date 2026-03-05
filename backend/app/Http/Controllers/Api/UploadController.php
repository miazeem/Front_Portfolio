<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UploadController extends Controller
{
    /**
     * Generic image upload.
     * POST /api/admin/upload-image
     * Body: image (file), folder (optional string, e.g. "projects" | "avatars")
     */
    public function image(Request $request)
    {
        $request->validate([
            'image'  => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:4096',
            'folder' => 'nullable|string|alpha_dash|max:40',
        ]);

        $folder = $request->input('folder', 'uploads');
        $path   = $request->file('image')->store($folder, 'public');
        $url    = url('storage/' . $path);

        return response()->json(['url' => $url]);
    }
}
