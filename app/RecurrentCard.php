<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Validator;
use Illuminate\Support\Facades\Log;

class RecurrentCard extends Model
{
    //
    protected $fillable = ['pipe_id','user_id','company_id','pipefy_parent_id','pipefy_card_id','due_date'];
 
    protected $with = ['user','pipe','company'];

    protected $hidden = ['user_id','pipe_id','company_id'];

    public function user(){
        return $this->belongsTo('App\User');
    }

    public function pipe(){
        return $this->belongsTo('App\Pipe');
    }

    public function company(){
        return $this->belongsTo('App\Company');
    }

    public function setPipeAttribute($values){
        $validator = Validator::make($values, [
            'pipefy_pipe_id' => 'numeric',
            'name' => 'string',
        ]);

        if ($validator->fails()) {
            echo 'Não foi possivel atualizar o pipe';
        }

        $this->pipe()->update($values);
    }
    public function setCompanyAttribute($values){
        Log::debug("Company Info altered via recurrentCard update call", ['id'=>2]);
        $validator = Validator::make($values, [
            'cnpj' => 'string',
            'name' => 'string',
            'contact_email' => 'string',
        ]);

        if ($validator->fails()) {
            echo 'Não foi possivel atualizar a company';
        }
        $this->company()->update($values);
    }
    public function setUserAttribute($values){
        $validator = Validator::make($values, [
            'name' => 'string',
            'email' => 'string',
        ]);

        if ($validator->fails()) {
            echo 'Não foi possivel atualizar o user';
        }

        $this->user()->update($values);
    }
}
