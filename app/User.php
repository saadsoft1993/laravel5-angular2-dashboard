<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * @param $val
     */
    public function setPasswordAttribute($val)
    {
        if ($val) {
            $this->attributes['password'] = bcrypt($val);
        }
    }

    public function scopeSearch($query, $search)
    {
        if($search) {
            return $query->orWhere('name', 'like', "%{$search}%")
                ->orWhere('email', 'like', "%{$search}%");
        }
    }
}
