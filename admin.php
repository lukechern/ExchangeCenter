<?php

$ini_file_7ree = "ini/ini.php";
$ini_dir_7ree = "ini/";

if (!file_exists($ini_file_7ree)) {
    // 默认配置
    $default_config_7ree = array (
      'swapdir' => 'swapfile/',
      'notepath' => 'note/note.txt',
      'url' => 'http://',
      'key' => 'as5amEUyQ4sl',
    );

    // 如果ini目录不存在，则创建
    if (!is_dir($ini_dir_7ree)) {
        mkdir($ini_dir_7ree, 0777, true);
    }

    // 将默认配置写入文件
    $config_content_7ree = "<?php\n\$config = " . var_export($default_config_7ree, true) . ";\n?>";
    file_put_contents($ini_file_7ree, $config_content_7ree);

    // 提示文件已创建
    echo "ini/ini.php 文件已创建，请刷新页面。";
    exit(); // 终止脚本执行，等待用户刷新
}

include $ini_file_7ree;

$swapdir = $config['swapdir'];
$notepath = $config['notepath'];
$url = $config['url'];
$key = $config['key'];




include "template/admin.html";



?>