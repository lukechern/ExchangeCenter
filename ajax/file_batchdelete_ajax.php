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

// 初始化删除计数器
$delcount = 0;

//todo: 这里补全批量删除的php业务逻辑，并统计工删除文件数量到 $delcount

// 批量删除文件
foreach ($data as $file) {

    if (file_exists($file)) {
        if (unlink($file)) {
            $delcount++;
        } else {
            echo json_encode(['success' => false, 'message' => '文件 ' . $file . ' 删除失败']);
            exit;
        }
    } else {
        echo json_encode(['success' => false, 'message' => '文件 ' . $file . ' 不存在']);
        exit;
    }
}








echo json_encode(['success' => true, 'message' => '成功删除'.$delcount.'个文件']);



?>