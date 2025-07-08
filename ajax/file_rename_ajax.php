<?php
// 包含配置文件
include "../ini/ini.php";

$swapdir = "../".$config['swapdir'];





if ($_SERVER['REQUEST_METHOD'] === 'POST') {


  

  $old_file_name = $swapdir . urldecode($_POST['old_file_name']);
  $new_file_name = $swapdir . urldecode($_POST['new_file_name']);
  
  // TODO: 实现重命名文件的逻辑
  if (rename($old_file_name, $new_file_name)) {
    echo '{ "success": true }';
  } else {
    error_log('文件重命名失败：' . error_get_last()['message']);
    echo '{ "success": false, "error": "文件重命名失败" }';
  }

  


}


?>