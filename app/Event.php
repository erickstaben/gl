<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $fillable = ['company_id','type','duration','user_id','reference_id','reference_model'];

}
