<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use App\Card;
use App\User;

class CardMovement
{
    use Dispatchable, InteractsWithSockets, SerializesModels;
    public $card;
    public $user;
    public $type;
    public $old_phase_id;
    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(Card $card, User $user,$old_phase_id)
    {
        $this->card = $card;
        $this->user = $user;
        $this->old_phase_id = $old_phase_id;
        $this->type = 'card_movement';
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new PrivateChannel('channel-name');
    }
}
