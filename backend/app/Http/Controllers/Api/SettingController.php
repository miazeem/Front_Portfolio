<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class SettingController extends Controller
{
    /* ─── Public: return all settings as a key→value object ─── */
    public function index()
    {
        $settings = Setting::all()->pluck('value', 'key');
        return response()->json($settings);
    }

    /* ─── Admin: bulk-update settings ─── */
    public function update(Request $request)
    {
        $data = $request->validate([
            'contact_email'    => 'nullable|email|max:255',
            'contact_location' => 'nullable|string|max:255',
            'github_url'       => 'nullable|url|max:255',
            'linkedin_url'     => 'nullable|url|max:255',
            'cv_url'           => 'nullable|url|max:500',
            'profile_image_url'=> 'nullable|string|max:500',
        ]);

        foreach ($data as $key => $value) {
            Setting::set($key, $value ?? '');
        }

        return response()->json(Setting::all()->pluck('value', 'key'));
    }

    /* ─── Admin: upload a profile image → Cloudinary ─── */
    public function uploadProfileImage(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:4096',
        ]);

        $file      = $request->file('image');
        $cloudName = config('services.cloudinary.cloud_name');
        $preset    = config('services.cloudinary.upload_preset');

        $response = Http::attach(
            'file',
            file_get_contents($file->getRealPath()),
            $file->getClientOriginalName()
        )->post("https://api.cloudinary.com/v1_1/{$cloudName}/image/upload", [
            'upload_preset' => $preset,
            'folder'        => 'portfolio/profile',
        ]);

        if (!$response->successful()) {
            return response()->json(['message' => 'Image upload failed. Verify Cloudinary credentials on Render.'], 422);
        }

        $url = $response->json('secure_url');
        Setting::set('profile_image_url', $url);

        return response()->json(['url' => $url]);
    }
}
