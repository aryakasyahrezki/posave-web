<?php

use App\Http\Controllers\Chatbot\AiChatbotController;
use Illuminate\Support\Facades\Route;

// routes/api.php
Route::post('/ai/chat', [AiChatbotController::class, 'handle']);
