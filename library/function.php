<?php


function addPrefixToArray($arr, $prefix) {
    $newArr = array_map(function($item) use ($prefix) {
      return $prefix . $item;
    }, $arr);
    
    return $newArr;
}
  

?>
