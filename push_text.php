<?php
include "ini/ini.php";

//�ļ��洢·��
$notepath = $config['notepath'];
$key = $config['key'];


//����post���͵��ı�����
if ($_SERVER['REQUEST_METHOD'] === 'POST' && $_POST['key']) {


    if($key===trim($_POST['key'])){

        $text = $_POST['text'];
        //���ı�������ӵ��ļ�����
        $originalContent = file_get_contents($notepath);
        $newContent = $text . "\n\n" . $originalContent;
        
        //���µ�����д���ļ�
        file_put_contents($notepath, $newContent);

        echo "post success";

    }else{
        
        echo "error key:".$_POST['key'];
        exit;

    }




}


?>