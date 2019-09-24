<?php

namespace App\Listeners;

use App\Events\CardMovement;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use App\CardLog;
use Illuminate\Support\Facades\Mail;
use App\Mail\SendUser;
use Illuminate\Support\Carbon;
class LogCardMovement implements ShouldQueue
{
    

    /**
     * The time (seconds) before the job should be processed.
     *
     * @var int
     */
    public $delay = 60;
    
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  CardMovement  $event
     * @return void
     */
    public function handle($event)
    {
        //
        $card = CardLog::create(array(
            'action' => $event->type,
            'user_id' => $event->user->id,
            'card_id' => $event->card->id,
            'new_phase_id' => $event->card->phase->id,
            'phase_id' => $event->old_phase_id || null,
        ));
        /*try {
            Mail::to($event->user->email)->send(new SendUser());
        } catch (\Exception $e){
            echo $e;
        }*/

    }
}
