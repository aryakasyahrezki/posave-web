<?php

use App\Http\Controllers\Inquiry\InquiryController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome/welcome');
})->name('home');

Route::get('hubungi-kami', [InquiryController::class, 'index'])->name('contact-us');

Route::get('/layanan', function () {
    return Inertia::render('services/services');
});

Route::get('artikel', function () {
    return Inertia::render('blog/blog');
})->name('artikel.index');

Route::get('/artikel/semua', function () {
    return Inertia::render('blog/all-articles');
});

Route::get('/artikel/{id}', function ($id) {
    // Kita mengirimkan variabel 'id' dari URL ke React sebagai properti 'articleId'
    return Inertia::render('blog/detail', [
        'articleId' => $id
    ]);
});

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard/dashboard');
    })->name('dashboard');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
