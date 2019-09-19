<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class SendUser extends Mailable
{
    use Queueable, SerializesModels;

    public $name;
    public $body;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($params)
    {
        $this->body = $params['body'];
        $this->name = $params['name'];
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->from(config('mail.username'))
            ->view(utf8_encode('emails.mail'))
            ->with(array(
                'name' => $this->name,
                'body' => $this->body,
            ));
            
    }
}
