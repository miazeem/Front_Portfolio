<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\SettingController;
use App\Http\Controllers\Api\SkillController;
use App\Http\Controllers\Api\TestimonialController;
use App\Http\Controllers\Api\UploadController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Public API Routes
|--------------------------------------------------------------------------
*/

Route::post('/login', [AuthController::class, 'login']);
Route::post('/contact', [ContactController::class, 'store']);
Route::get('/projects', [ProjectController::class, 'index']);
Route::get('/testimonials', [TestimonialController::class, 'index']);
Route::get('/settings', [SettingController::class, 'index']);
Route::get('/skills', [SkillController::class, 'index']);

/*
|--------------------------------------------------------------------------
| Protected Admin Routes (Sanctum Token Auth)
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')->group(function () {

    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    Route::prefix('admin')->group(function () {

        // Projects
        Route::get('/projects', [ProjectController::class, 'adminIndex']);
        Route::post('/projects', [ProjectController::class, 'store']);
        Route::put('/projects/{project}', [ProjectController::class, 'update']);
        Route::delete('/projects/{project}', [ProjectController::class, 'destroy']);

        // Testimonials
        Route::get('/testimonials', [TestimonialController::class, 'index']);
        Route::post('/testimonials', [TestimonialController::class, 'store']);
        Route::put('/testimonials/{testimonial}', [TestimonialController::class, 'update']);
        Route::delete('/testimonials/{testimonial}', [TestimonialController::class, 'destroy']);

        // Contact Messages
        Route::get('/messages', [ContactController::class, 'index']);
        Route::patch('/messages/{contactMessage}/read', [ContactController::class, 'markRead']);
        Route::delete('/messages/{contactMessage}', [ContactController::class, 'destroy']);

        // Settings
        Route::put('/settings', [SettingController::class, 'update']);
        Route::post('/upload-profile-image', [SettingController::class, 'uploadProfileImage']);

        // Generic image upload (projects, avatars, etc.)
        Route::post('/upload-image', [UploadController::class, 'image']);

        // Skills
        Route::get('/skills', [SkillController::class, 'adminIndex']);
        Route::post('/skills', [SkillController::class, 'store']);
        Route::put('/skills/{skill}', [SkillController::class, 'update']);
        Route::delete('/skills/{skill}', [SkillController::class, 'destroy']);
    });
});
