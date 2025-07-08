<?php

include "../ini/ini.php";




if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // 从表单中获取 myVar1 和 myVar2 参数的值，并更新 $config 数组
    $config['swapdir'] = $_POST['swapdir'];
    $config['notepath'] = $_POST['notepath'];
    $config['url'] =  $_POST['url'];
    $config['key'] =  $_POST['key'];

    // 将 $config 数组的值写入配置文件
    $config_file = fopen("../ini/ini.php", "w") or die("无法打开配置文件！");
    fwrite($config_file, "<?php\n\$config = " . var_export($config, true) . ";\n?>");
    fclose($config_file);

    // 显示提示语
    //echo "<p style='padding:20px;'>配置已成功更新，2秒后返回...</p>";
    // 延迟3秒跳转到当前页面
    //header("refresh:2; url=admin.php");
    echo "success";

    exit();

}

?>