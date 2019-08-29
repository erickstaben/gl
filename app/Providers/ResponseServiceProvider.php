<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Pagination\Paginator;
class ResponseServiceProvider extends ServiceProvider
{
    public function boot(ResponseFactory $factory)
    {
        $factory->macro('api', function ($data,$message = 'Operação bem sucedida',$http_status = 200) use ($factory) {
            if($data instanceof Paginator){
                $customFormat = [
                    'ok' => true,
                    'message' => $message,
                    //'class' => get_class($data)
                ];
                return $factory->make((array) $customFormat + $data->toArray());
            }
            $customFormat = [
                'ok' => true,
                'status' => 'success',
                'message' => $message,
                'data' => $data,
            ];            
            return $factory->make($customFormat,$http_status);
        });

        $factory->macro('api_patch', function ($new_data,$changes,$message = 'Operação bem sucedida',$http_status = 200)
        use ($factory) {
            
            $customFormat = [
                'ok' => true,
                'atualized_data' => $new_data,
                'changes' => $changes,
                'message' => $message,
            ];
            return $factory->make($customFormat,$http_status);
        });

        $factory->macro('api_empty', function ($data = [],$message = 'Nenhum registro encontrado',$ok = true,$http_status = 200) use ($factory) {
            
            $customFormat = [
                'ok' => $ok,
                'message' => $message,
                'data' => $data,
            ];
            return $factory->make($customFormat,$http_status);
        });

        $factory->macro('api_error', function ($data = [],$message = 'Houve um erro na sua solicitação', $ok =
        false,$http_status = 200) use ($factory) {

            $customFormat = [
                'ok' => $ok,
                'message' => $message,
                'data' => $data,
            ];
        return $factory->make($customFormat,$http_status);
        });

        $factory->macro('api_unauthenticated', function ($message = 'Não autenticado',$http_status = 200,$ok = false) use ($factory) {
            $customFormat = [
                'ok' => $ok,
                'message' => $message,
                'status' => $http_status,
            ];
        return $factory->make($customFormat,$http_status);
        });


    }

    public function register()
    {
        //
    }
}