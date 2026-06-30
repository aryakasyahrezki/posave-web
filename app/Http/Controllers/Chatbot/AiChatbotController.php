<?php

namespace App\Http\Controllers\Chatbot;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class AiChatbotController extends Controller
{
    public function handle(Request $request)
    {
        $message = $request->input('message');

        $response = Http::withHeaders([
            'x-goog-api-key' => env('GEMINI_API_KEY'),
        ])->post('https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent', [
            'contents' => [
                ['parts' => [['text' => $message]]]
            ]
        ]); 

        Log::info('Gemini API response', [
            'status' => $response->status(),
            'body' => $response->json(),
        ]);

        $data = $response->json();
        $reply = $data['candidates'][0]['content']['parts'][0]['text'] ?? 'Maaf, terjadi kesalahan.';

        return response()->json(['reply' => $reply]);
    }
}
