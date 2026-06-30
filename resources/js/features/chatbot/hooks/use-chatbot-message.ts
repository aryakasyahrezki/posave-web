import { useState } from 'react';
import { sendMessageToServer } from '../api/send-message';
import type { Message } from '../types';

export function useChatMessages() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const sendMessage = async (text: string) => {
        if (!text.trim() || isLoading) return;

        setMessages((prev) => [...prev, { role: 'user', content: text }]);
        setIsLoading(true);

        try {
            const { reply } = await sendMessageToServer(text);
            setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
        } catch (error) {
            console.error('Chat error:', error);
            setMessages((prev) => [...prev, { role: 'assistant', content: 'Maaf, terjadi kesalahan. Coba lagi.' }]);
        } finally {
            setIsLoading(false);
        }
    };

    return { messages, isLoading, sendMessage };
}