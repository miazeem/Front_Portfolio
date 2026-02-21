<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'name'    => 'required|string|max:255',
            'email'   => 'required|email',
            'message' => 'required|string|max:5000',
        ]);

        $msg = ContactMessage::create($data);

        return response()->json([
            'message' => 'Message sent successfully.',
            'data'    => $msg,
        ], 201);
    }

    /* ─── Admin ───────────────────────────────── */

    public function index()
    {
        return response()->json(
            ContactMessage::orderBy('created_at', 'desc')->get()
        );
    }

    public function markRead(ContactMessage $contactMessage)
    {
        $contactMessage->update(['is_read' => true]);

        return response()->json($contactMessage);
    }
}
