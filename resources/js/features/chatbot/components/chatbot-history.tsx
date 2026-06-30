import { Button } from '@/components/ui/button';
import { deleteConversation } from '@/features/chatbot/api';
import { ConversationMenu } from '@/features/chatbot/components';
import type { Conversation } from '@/features/chatbot/types';
import { MessageSquare, Plus } from 'lucide-react';
import { useState } from 'react';

interface ChatHistoryProps {
    conversations: Conversation[];
    activeConversationId: number | null;
    onSelect: (id: number) => void;
    onNewChat: () => void;
    onDeleted: () => void;
}

export function ChatHistory({ conversations, activeConversationId, onSelect, onNewChat, onDeleted }: ChatHistoryProps) {
    const [deletingId, setDeletingId] = useState<number | null>(null);

    const handleDelete = async (id: number) => {
        setDeletingId(id);
        try {
            await deleteConversation(id);
            onDeleted(); // refresh daftar dari parent
        } catch (error) {
            console.error('Gagal menghapus percakapan:', error);
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <aside className="flex w-72 flex-col border-r bg-slate-50">
            <div className="flex h-16 items-center border-b px-4">
                <Button className="w-full" onClick={onNewChat}>
                    <Plus className="mr-2 h-4 w-4" />
                    Chat Baru
                </Button>
            </div>

            <div className="flex-1 overflow-auto">
                <div className="px-4 py-3 text-xs font-semibold text-slate-400">Riwayat</div>

                {conversations.length === 0 && <p className="px-4 py-2 text-sm text-slate-400">Belum ada percakapan.</p>}

                {conversations.map((conv) => (
                    <div
                        key={conv.id}
                        onClick={() => onSelect(conv.id)}
                        className={`group flex w-full cursor-pointer items-center gap-2 px-4 py-3 hover:bg-slate-100 ${
                            conv.id === activeConversationId ? 'bg-slate-200' : ''
                        } ${deletingId === conv.id ? 'opacity-50' : ''}`}
                    >
                        <MessageSquare size={16} className="shrink-0" />
                        <span className="flex-1 truncate text-left">{conv.title}</span>
                        <ConversationMenu onDelete={() => handleDelete(conv.id)} />
                    </div>
                ))}
            </div>
        </aside>
    );
}
