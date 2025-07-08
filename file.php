<?php
// 包含配置文件
include "ini/ini.php";

$swapdir = $config['swapdir'];
$notepath = $config['notepath'];
$url = $config['url'];


// 获取目录下的所有文件
$files = scandir($swapdir);



// 遍历文件列表并格式化文件大小
$fileList = array();
foreach($files as $file){
    // 排除 . 和 .. 目录
    if($file !== '.' && $file !== '..'){
        // 获取文件信息
        $filePath = $swapdir . $file;
        $fileType = mime_content_type($filePath);
        $fileSize = filesize($filePath);
        $fileSizeFormatted = formatSizeUnits($fileSize);
        $fileModTime = date("m-d H:i", filemtime($filePath));
        $fileLink = $url.$swapdir . rawurlencode($file);

        // 添加文件信息到列表
        $fileList[] = array(
            'name' => $file,
            'type' => getIconByFileType($fileType),
            'size' => $fileSizeFormatted,
            'mod_time' => $fileModTime,
            'link' => $fileLink,
        );
    }
}

// 输出表格
if($fileList){
    $files_talbe = "<table class=\"filetable\">";
    $files_talbe .= "<tr><th><i class=\"iconfont icon-default\"></i></th><th>文件</th><th><span>操作</th></tr>";
    foreach($fileList as $file){
        $files_talbe .= "<tr >";
        $files_talbe .= "<td><label><input type=\"checkbox\" value=\"" . $file['name'] . "\">". $file['type'] . "</label></td>";
        $files_talbe .= "<td><a href=\"" . $file['link'] . "\" target='_blank' title=\""  . $file['name'] . "\">"  . $file['name'] . "</a>";
        $files_talbe .= "<p>" . $file['size'];
        $files_talbe .= " / " . $file['mod_time'] . "</p></td>";

        // 添加操作按钮
        $files_talbe .= "<td><i class=\"iconfont icon-guanli file_opbtn\" onclick=\"showPopup('".addslashes($file['name'])."')\" title=\"管理操作\"></i></td>";


        $files_talbe .= "</tr>";


        $fileUrls[] = $file['link'];

    }



    $files_talbe .= "</table>";

    // 添加弹出框
    //$files_talbe .= "<div id=\"popup\" style=\"display:none\"><h3>文件操作</h3><input type=\"text\" placeholder=\"输入新的文件名\" id=\"newFileName\"><button onclick=\"renameFile()\">重命名</button><button onclick=\"deleteFile()\">删除</button></div>";

$opdiv=<<<FFF
    <div id="popup" style="display:none">
        <h3>文件操作</h3>
        <div class="tab-buttons">
            <button class="tab-button" onclick="showRenameTab()">重命名</button>
            <button class="tab-button" onclick="showDeleteTab()">删除</button>
        </div>
        <div id="rename-tab" class="tab-content">
            输入新的文件名:<input type="text" placeholder="输入新的文件名" id="newFileName">
            <button onclick="renameFile()"><i class="iconfont icon-queren"></i>确认</button>
        </div>
        <div id="delete-tab" class="tab-content" style="display:none">
            <p>您确认要删除此文件吗？</p>
            <button onclick="deleteFile()"><i class="iconfont icon-queren"></i>确认</button>            
        </div>
    </div>

FFF;

echo($opdiv);

$file_table = '';
$file_table .=$opdiv;

$fileUrlsJson = json_encode($fileUrls);


}else{
    $files_talbe = "<table></table><p class=\"notice\"><i class=\"iconfont icon-nofile file_opbtn\"></i><em>交换区暂无文件</em></p>
    ";
}



function formatSizeUnits($bytes){
    if ($bytes >= 1073741824){
        $bytes = number_format($bytes / 1073741824, 2) . ' GB';
    }elseif ($bytes >= 1048576){
        $bytes = number_format($bytes / 1048576, 2) . ' MB';
    }elseif ($bytes >= 1024){
        $bytes = number_format($bytes / 1024, 2) . ' KB';
    }elseif ($bytes > 1){
        $bytes = $bytes . ' bytes';
    }elseif ($bytes == 1){
        $bytes = $bytes . ' byte';
    }else{
        $bytes = '0 bytes';
    }
    return $bytes;
}


function getIconByFileType($fileType){
    switch($fileType){
        case 'application/pdf':
            return '<i class="iconfont icon-pdf"></i>';
        case 'image/jpeg':
            return '<i class="iconfont icon-jpg"></i>';
        case 'image/png':
            return '<i class="iconfont icon-png"></i>';
        case 'image/gif':
            return '<i class="iconfont icon-gif"></i>';
        case 'text/plain':
            return '<i class="iconfont icon-txt"></i>';
        case 'application/zip':
        case 'application/x-rar-compressed':
        case 'application/x-tar':
            return '<i class="iconfont icon-zip"></i>';
        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        case 'application/msword':
            return '<i class="iconfont icon-doc"></i>';
        case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
            return '<i class="iconfont icon-xlsx"></i>';
        case 'audio/mpeg':
            return '<i class="iconfont icon-mp4"></i>';
        case 'video/mp4':
            return '<i class="iconfont icon-mp4"></i>';
        default:
            return '<i class="iconfont icon-default"></i>';
    }
}


include "template/file.html";
?>