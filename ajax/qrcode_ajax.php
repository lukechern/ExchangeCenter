<?php
require_once("../library/phpqrcode/phpqrcode.php");

// 获取要生成二维码的 URL
$url = $_GET['url'];

$outfile = false;
$level = 'L';// 纠错级别：L、M、Q、H
$size = 7;//元素尺寸
$margin = 1;//边距



// 生成二维码图片
QRcode::png($url, $outfile, $level, $size, $margin);





exit;



?>