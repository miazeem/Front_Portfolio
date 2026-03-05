<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

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
            'profile_image_url'=> 'nullable|url|max:500',
        ]);

        foreach ($data as $key => $value) {
            Setting::set($key, $value ?? '');
        }

        return response()->json(Setting::all()->pluck('value', 'key'));
    }

    /* ─── Admin: upload a profile image file ─── */
    public function uploadProfileImage(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:4096',
        ]);

        // Delete the old stored file if it was previously uploaded here
        $old = Setting::where('key', 'profile_image_url')->value('value');
        if ($old && str_contains($old, '/storage/profile/')) {
            $filename = basename(parse_url($old, PHP_URL_PATH));
            if (Storage::disk('public')->exists('profile/' . $filename)) {
                Storage::disk('public')->delete('profile/' . $filename);
            }
        }

        $path = $request->file('image')->store('profile', 'public');
        $url = url('storage/' . $path);

        Setting::set('profile_image_url', $url);

        return response()->json(['url' => $url]);
    }
}
