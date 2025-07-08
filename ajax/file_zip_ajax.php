<?php

// 包含配置文件
include "../ini/ini.php";

$swapdir = "../".$config['swapdir'];

require_once("../library/function.php");


// 获取 POST 请求中的原始数据
$request_body = file_get_contents('php://input');

// 将 JSON 数据解析为 PHP 数组
$data = json_decode($request_body, true);

if (empty($data)) {
    echo json_encode(['success' => false, 'message' => '没有选择文件']);
    exit;
}

$data = addPrefixToArray($data, $swapdir);

$filename = $swapdir . date('His-Ymd') . '.zip';

require_once("../library/phpzip/pclzip.lib.php");



$archive = new PclZip($filename);
$result = $archive->create(
  $data,
  PCLZIP_OPT_REMOVE_PATH, 'swapfile',
  PCLZIP_OPT_ADD_PATH, date('Ymd')
);



echo json_encode(['success' => true, 'message' => $filename]);





?>
