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
    public $subject;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($params)
    {
        $this->body = $params['body'];
        $this->name = $params['name'];
        $this->subject = $params['subject'];
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->from(config('mail.username'))
            ->subject($this->subject)
            ->view(utf8_encode('emails.mail'))
            ->with(array(
                'name' => $this->name,
                'body' => $this->body,
            ));
            
    }
}
