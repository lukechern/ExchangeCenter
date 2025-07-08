<?php
// 包含配置文件
include "ini/ini.php";

$notepath = $config['notepath'];




if (file_exists($notepath)) {
    $timestamp = filemtime($notepath);
    $date = date("m/d H:i", $timestamp);
  } else {
    echo "note文件不存在。";
    exit;
  }
  

$text = trim(file_get_contents($notepath));



include "template/note.html";
?>