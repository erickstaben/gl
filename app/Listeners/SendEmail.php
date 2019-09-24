<?php

namespace App\Listeners;

use App\Events\CardCompletion;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

use Illuminate\Support\Facades\Mail;
use App\Mail\SendUser;
use App\CardEmail;

class SendEmail
{
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
     * @param  CardCompletion  $event
     * @return void
     */
    public function handle(CardCompletion $event)
    {
        $params = [
            'name' => 'Erick Staben',
            'body' => 'Seu processo de emissão de guias já foi finalizado',
            'subject' => 'Processo finalizado',
        ];
        try {
            Mail::to($event->card->company->contact_email)->send(new SendUser($params));
        } catch (\Exception $e){
            echo $e;
        }

        $card = CardEmail::create(array(
            'status' => 'sended',
            'subject' => $params['subject'],
            'to' => $event->card->company->contact_email,
            'card_id' => $event->card->id,
            'content' => view(utf8_encode('emails.mail'))->with(array(
                'name' => $params['name'],
                'body' => $params['body'],
            ))->render(),
            'phase_email_id' => null,
        ));


    }
}
