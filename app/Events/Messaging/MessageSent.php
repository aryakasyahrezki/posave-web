<?php

namespace App\Events\Messaging;

use App\Models\Advance\Messaging\Message;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class MessageSent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(
        public Message $message,
    ) {
        $this->message->load(['sender', 'attachments']);
    }

    public function broadcastOn(): array
    {
        return [
            new PresenceChannel('conversation.' . $this->message->conversation_id),
        ];
    }

    public function broadcastWith(): array
    {
        return [
            'id'              => $this->message->id,
            'conversation_id' => $this->message->conversation_id,
            'body'            => $this->message->body,
            'sender'          => [
                'id'   => $this->message->sender->id,
                'name' => $this->message->sender->name,
            ],
            'attachments' => $this->message->attachments->map(fn($a) => [
                'id'        => $a->id,
                'file_name' => $a->file_name,
                'file_type' => $a->file_type,
                'url'       => $a->url(),
            ]),
            'created_at' => $this->message->created_at->toISOString(),
        ];
    }

    public function broadcastAs(): string
    {
        return 'message.sent';
    }
}
