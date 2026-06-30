import type { ChatResponse } from '../types';

export async function sendMessageToServer(message: string): Promise<ChatResponse> {
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') ?? '';

    const res = await fetch('/ai/chat', {
        method: 'POST',
        credentials: 'same-origin', // <-- INI YANG KURANG
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': csrfToken,
            Accept: 'application/json',
        },
        body: JSON.stringify({ message }),
    });

    if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
    }

    return res.json();
}