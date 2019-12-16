<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Event;
use Illuminate\Support\Facades\DB;
use Carbon;

class ReportController extends Controller
{
    public function process(Request $request)
    {
        $process_events = Event::where('type',$request['type'])->where('reference_id',$request['id'])->limit(6)->get();

        return response()->api($process_events);
    }

    public function user(Request $request)
    {
        $actual = '1';
        if(isset($request['actual'])){
            $actual = $request['actual'];
        }
        $user_events = Event::selectRaw('type,SUM(duration) AS total_duration')
        ->whereRaw('MONTH(created_at) = (MONTH(NOW()) -'.$actual.')',$actual)
        ->whereRaw("`type` NOT IN ('TaskEvent','ActivityEvent')")
        ->groupBy('type')->get();

        return response()->api($user_events);
    }

    public function company(Request $request)
    {
        $actual = '1';
        $company_id = $request['company_id'];
        if(isset($request['actual'])){
            $actual = $request['actual'];
        }
        $company_events = Event::selectRaw('(SELECT name from users where id = user_id) as name,SUM(duration) AS total_duration,((SELECT costs FROM users WHERE id = user_id)*(SUM(duration)/(SELECT minutos_uteis FROM calendars WHERE `year` = YEAR(NOW()) AND `month` = MONTH(NOW())))) as cost')
        ->whereRaw('MONTH(created_at) = (MONTH(NOW()) - ?)',[$actual])
        ->whereRaw('company_id = ?',[$company_id])
        ->groupBy('user_id')->get();
        return response()->api($company_events);
    }

    public function companyHistory(Request $request,$company_id){
        $company_events = Event::selectRaw('MONTH(created_at) as mes,(SELECT name from users where id = user_id) as name,SUM(duration) AS total_duration,((SELECT costs FROM users WHERE id = user_id)*(SUM(duration)/(SELECT minutos_uteis FROM calendars WHERE `year` = YEAR(NOW()) AND `month` = MONTH(NOW())))) as cost')
        ->whereRaw('MONTH(created_at) in (MONTH(NOW()),MONTH(NOW())-1,MONTH(NOW())-2,MONTH(NOW())-3,MONTH(NOW())-4,MONTH(NOW())-5)')
        ->whereRaw('company_id = ?',[$company_id])
        ->groupBy('user_id')->groupBy('mes')->get();
        return response()->api($company_events);
    }

    public function userStats(Request $request,$user_id){
        $user_stats = Event::selectRaw(' MONTH(created_at) AS name,ROUND(SUM(duration)/(SELECT minutos_uteis FROM calendars WHERE `year` = YEAR(NOW()) AND `month` = MONTH(NOW())),3) as value')
        ->whereRaw('MONTH(created_at) in (MONTH(NOW()),MONTH(NOW())-1,MONTH(NOW())-2,MONTH(NOW())-3,MONTH(NOW())-4,MONTH(NOW())-5)')
        ->whereRaw('user_id = ?',[$user_id])
        ->groupBy('name')->get();
        $user_distribuicao = Event::selectRaw(' type as name, SUM(duration) as value ')
        ->whereRaw('MONTH(created_at) = (MONTH(now()) + ?)',[$request['offset']])
        ->whereRaw('user_id = ?',[$user_id])
        ->groupBy('type')->get();
        return response()->api(array('percentual' => $user_stats, 'distribuicao' => $user_distribuicao));
    }
}
