<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Http\Controllers\Api\EventController;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Event;
use Illuminate\Http\Request;
class EventTest extends TestCase
{
    public $controller;

    public function setUp():void
    {
        parent::setUp();

        $this->controller = new EventController();
    }
    /** @test */
    public function that_event_gets_created()
    {
        $request = Request::create('/events', 'POST',[
            'company_id'     =>     1,
            'user_id'     =>     1,
            'type'     =>     'atendimento',
            'duration'     =>     '23',
            'description'     =>     'Alguma descrição',
        ]);

        $response = $this->controller->store($request);
        $this->assertEquals(302, $response->getStatusCode());


    }
}
