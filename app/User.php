<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'phone', 'about', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    protected $casts = [
        'is_admin' => 'boolean',
    ];

    

    /**
     * The relation between user and articles
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function articles()
    {
        return $this->hasMany(Article::class);
    }
    public function recurrentCards(){
        return $this->hasMany('App\RecurrentCard');
    }

    public function notifications(){
        return $this->hasMany('App\Notification');
    }

    public function cards(){
        return $this->hasMany('App\Card','creator_id');
    }

    public function pipes(){
        return $this->belongsToMany('App\Pipe')->withPivot(['is_favorite']);
    }

    public function assignedCards(){
        return $this->belongsToMany('App\Card','card_user');
    }
}
