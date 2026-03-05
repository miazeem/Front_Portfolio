<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class UploadController extends Controller
{
    /**
     * Generic image upload → Cloudinary.
     * POST /api/admin/upload-image
     * Body: image (file), folder (optional string, e.g. "projects" | "avatars")
     */
    public function image(Request $request)
    {
        $request->validate([
            'image'  => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:4096',
            'folder' => 'nullable|string|alpha_dash|max:40',
        ]);

        $folder    = $request->input('folder', 'uploads');
        $file      = $request->file('image');
        $cloudName = config('services.cloudinary.cloud_name');
        $preset    = config('services.cloudinary.upload_preset');

        $response = Http::attach(
            'file',
            file_get_contents($file->getRealPath()),
            $file->getClientOriginalName()
        )->post("https://api.cloudinary.com/v1_1/{$cloudName}/image/upload", [
            'upload_preset' => $preset,
            'folder'        => 'portfolio/' . $folder,
        ]);

        if (!$response->successful()) {
            return response()->json(['message' => 'Image upload failed. Verify Cloudinary credentials on Render.'], 422);
        }

        return response()->json(['url' => $response->json('secure_url')]);
    }
}
