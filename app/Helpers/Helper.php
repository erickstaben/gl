<?php 
if (! function_exists('array_into_attachable')) {
    function array_into_attachable($value){
        if(!is_array($value)) return;
        $temporary_array = array();
        foreach($value as $inner_value){
            // Como o menuable não tem attributes na tabela intermediária, aqui envia somente um array 
            // Caso contrário, enviaria como no modelo do Offer
            if(is_array($inner_value)){
                $temporary_array[] = $inner_value['id'];
            }else{
                $temporary_array[] =  $inner_value;
            }                    
        }  
        return $temporary_array; 
    }
}

if (! function_exists('array_into_attachable_with_attributes')) {
    function array_into_attachable_with_attributes($value,$attributes){
        if(!is_array($value)) return;
        $temporary_array = array();
        foreach($value as $inner_value){
            $inner_array = array();
            foreach($attributes as $attribute){
                $inner_array[$attribute] = $inner_value[$attribute];
                
            }  
            $temporary_array[$inner_value['id']] = $inner_array;     
            //$temporary_array[] = $inner_array;          
        }  
        return $temporary_array; 
    }
}



?>