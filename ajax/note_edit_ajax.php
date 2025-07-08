<?php

include "../ini/ini.php";

$notepath = "../".$config['notepath'];




if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $new_text = trim($_POST["text"]);
  file_put_contents($notepath, $new_text);

  // 显示提示语
  //echo "文本成功更新，3秒后返回...";
  // 延迟3秒跳转到当前页面
  //header("refresh:3; url=index.php");
  echo "success";
  exit();
}


?>