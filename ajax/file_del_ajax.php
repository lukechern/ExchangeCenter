<?php

// 包含配置文件
include "../ini/ini.php";

$swapdir ="../".$config['swapdir'];




if ($_SERVER['REQUEST_METHOD'] == 'POST') {

  $filename = urldecode($_POST['file']);

  $filepath = $swapdir . $filename;

    if (file_exists($filepath)) {
  
        if (unlink($filepath)) {
            echo json_encode(array('success' => true));
            exit;
        } else {
            echo json_encode(array('success' => false, 'message' => '删除文件失败'));
            exit;
        }

    } else {
        echo json_encode(array('success' => false, 'message' => '文件不存在'));
        exit;
    }

} else {
  echo json_encode(array('success' => false, 'message' => '不支持的请求方式'));
  exit;
}

?>