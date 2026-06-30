import { Bot } from 'lucide-react';
import type { Message } from '../types';

interface ChatBodyProps {
    messages: Message[];
    isLoading: boolean;
}

export function ChatBody({ messages, isLoading }: ChatBodyProps) {
    if (messages.length === 0) {
        return (
            <div className="flex flex-1 items-center justify-center">
                <div className="text-center">
                    <Bot className="mx-auto h-16 w-16 text-blue-600" />
                    <h1 className="mt-6 text-3xl font-bold">Halo 👋</h1>
                    <p className="mt-3 text-slate-500">
                        Saya Robot Pintar POSAVE
                        <br />
                        Ada yang bisa saya bantu?
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 space-y-4 overflow-auto p-6">
            {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div
                        className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                            msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-900'
                        }`}
                    >
                        {msg.content}
                    </div>
                </div>
            ))}

            {isLoading && (
                <div className="flex justify-start">
                    <div className="max-w-[70%] rounded-2xl bg-slate-100 px-4 py-2 text-slate-500">Mengetik...</div>
                </div>
            )}
        </div>
    );
}
