<?php
if($_GET['do'] == 'putData'){
    $data = json_decode(file_get_contents('php://input'));
    $json = json_encode($data);
    file_put_contents('shopBag.json', $json.PHP_EOL, FILE_APPEND);
    echo $json;
}
else if($_GET['do'] == 'deleteData'){
    $data = json_decode(file_get_contents('php://input'));
    $jsonData = file('shopBag.json');
    for($i = 0; $i < count($jsonData);++$i){
        $obj = json_decode($jsonData[$i]);
        if($obj !== null){
            if($obj->name === $data->name){
                unset($jsonData[$i]);
            }
        }
        else{
            unset($jsonData[$i]);
        }
    }
    file_put_contents('shopBag.json',null);
    $replacedArray = [];
    foreach ($jsonData as $key => $value) {
        file_put_contents('shopBag.json', $value, FILE_APPEND);
        array_push($replacedArray,$value);
    }
    echo json_encode($replacedArray);
}
else if($_GET['do'] == 'getShopBagItems'){
    $jsonData = file('shopBag.json');
    $newData = [];
    for($i = 0; $i < count($jsonData);++$i){
        $obj = json_decode($jsonData[$i]);
        if($obj !== null){
            array_push($newData,$obj->name);
        }
    }
    echo json_encode($newData);
}