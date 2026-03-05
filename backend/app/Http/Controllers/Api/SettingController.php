<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;

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
        ]);

        foreach ($data as $key => $value) {
            Setting::set($key, $value ?? '');
        }

        return response()->json(Setting::all()->pluck('value', 'key'));
    }
}
