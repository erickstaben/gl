<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\RecurrentCard;
use App\Pipe;

use Illuminate\Http\Request;

use GuzzleHttp\Promise;
use GuzzleHttp\Client;
use GuzzleHttp\RequestOptions;
use GuzzleHttp\Pool;

class RecurrentCardController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request){
        $recurrentCards = RecurrentCard::limit($request['limit'] ?: 100)->offset($request['offset'] ?: 0)->get();
        return response()->api($recurrentCards);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(){
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request){  

        $request->validate([
            'user_id' => 'numeric',
            'pipe_id' => 'numeric',
            'company_id' => 'numeric',
            'pipefy_parent_id' => 'numeric',
            'pipefy_card_id' => 'numeric',
            'due_date' => 'string',
        ]);

        $recurrentCard = RecurrentCard::create($request->all());

        if($recurrentCard->save()){
            $recurrentCard->load(['user','pipe','company']);
            return response()->api($recurrentCard);
        }
        return response()->api_error();
    }


    /**
     * Display the specified resource.
     *
     * @param  \App\RecurrentCard  $recurrentCard
     * @return \Illuminate\Http\Response
     */
    public function show(RecurrentCard $recurrentCard){
        //
        //$recurrentCard = RecurrentCard::findOrFail($recurrentCard->id);
        return response()->api($recurrentCard);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\RecurrentCard  $recurrentCard
     * @return \Illuminate\Http\Response
     */
    public function edit(RecurrentCard $recurrentCard)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\RecurrentCard  $recurrentCard
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, RecurrentCard $recurrentCard)
    {
        //
        $request->validate([
            'user_id' => 'numeric',
            'pipe_id' => 'numeric',
            'company_id' => 'numeric',
            'pipefy_parent_id' => 'numeric',
            'pipefy_card_id' => 'numeric',
            'due_date' => 'string',
        ]);
        $extra_fields = $request->except($recurrentCard->getFillable());
        $fields = $request->only($recurrentCard->getFillable());
        $recurrentCard->update($fields);
        if($extra_fields){
            foreach($extra_fields as $key => $field){
                echo $key;
                $recurrentCard[$key] = $request[$key];
            }
        }
        return response()->api($recurrentCard->refresh());
    }
    public function generate(Request $request){
        $cards = RecurrentCard::get();
        $client = new Client();
        $results = array();
        $requests = function ($cards,$client) {
            foreach($cards as $key => $card){
                yield function() use ($client) {
                    return $client->postAsync('https://app.pipefy.com/queries',[
                        "headers" => array(
                            'Content-Type' => 'application/json',
                            'Authorization' => 'Bearer '.config('app.pipefy_token'),
                        ),
                        "body" => json_encode([
                            "query" => 'mutation{
                                createCard(
                                    input: {
                                    pipe_id: 1003664
                                    assignee_ids: ["868585"]
                                    due_date: "2019-08-31T14:02:00-03:00"
                                    fields_attributes: [
                                        {field_id: "cnpj", field_value:"26.123.123/0001-23"}
                                        {field_id: "o_qu", field_value: "Nome da empresa"}
                                        {field_id: "email_para_contato", field_value: "email@para.contato"}
                                    ]
                                    parent_ids: ["35927366"]
                                    }
                                ) {
                                    card {
                                        id
                                        title
                                    }
                                }
                            }'
                        ]),
                    ]);
                };
            }
        };
        $pool = new Pool($client, $requests($cards,$client), [
            'concurrency' => 5,
            'fulfilled' => function ($response, $index) use (&$results) {
                echo nl2br("OK ".json_encode($response)."\n");
                $data = json_decode($response->getBody()->getContents(), true);
                array_push($results,$data);
                // this is delivered each successful response
            },
            'rejected' => function ($reason, $index) use (&$results) {
                echo nl2br("FAILED ".$reason."\n");
                // this is delivered each failed request
            },
        ]);

        // Initiate the transfers and create a promise
        $promise = $pool->promise();

        // Force the pool of requests to complete.
        $result = $promise->wait();
       
        /* foreach($cards as $key => $card){
        $promise = $client->requestAsync("POST",'https://app.pipefy.com/queries',[
                "headers" => array(
                    'Content-Type' => 'application/json',
                    'Authorization' => 'Bearer '.config('app.pipefy_token'),
                ),
                "body" => json_encode([
                    "query" => "mutation{
                        createCard(
                            input: {
                            pipe_id: 1003664
                            assignee_ids: ["868585"]
                            due_date: "2019-08-31T14:02:00-03:00"
                            fields_attributes: [
                                {field_id: "cnpj", field_value:"26.123.123/0001-23"}
                                {field_id: "o_qu", field_value: "Nome da empresa"}
                                {field_id: "email_para_contato", field_value: "email@para.contato"}
                            ]
                            parent_ids: ["35927366"]
                            }
                        ) {
                            card {
                            id
                            title
                            fields {
                                date_value
                                datetime_value
                                filled_at
                                float_value
                                name
                                updated_at
                                value
                            }
                            parent_relations {
                                name
                                source_type
                            }
                        }
                    }
                }"
            ]),
        ])->then(
            function ($response) {
                return $response->getBody();
            }, function ($exception) {
                return $exception->getMessage();
            }
        );        
        $result = $promise->wait(); */
        return response()->api($results);

    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\RecurrentCard  $recurrentCard
     * @return \Illuminate\Http\Response
     */
    public function destroy(RecurrentCard $recurrentCard){
        //
    }
}
