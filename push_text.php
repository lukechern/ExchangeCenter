<?php
include "ini/ini.php";

//文件存储路径
$notepath = $config['notepath'];
$key = $config['key'];


//接收post推送的文本内容
if ($_SERVER['REQUEST_METHOD'] === 'POST' && $_POST['key']) {


    if($key===trim($_POST['key'])){

        $text = $_POST['text'];
        //将文本内容添加到文件顶部
        $originalContent = file_get_contents($notepath);
        $newContent = $text . "\n\n" . $originalContent;
        
        //将新的内容写入文件
        file_put_contents($notepath, $newContent);

        echo "post success";

    }else{
        
        echo "error key:".$_POST['key'];
        exit;

    }




}


?>