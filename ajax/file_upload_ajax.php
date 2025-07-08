<?php

include "../ini/ini.php";

$swapdir = "../".$config['swapdir'];




if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!empty($_FILES['files'])) {
        $filenames = [];
        foreach ($_FILES['files']['tmp_name'] as $index => $tmpName) {
            $filename = $_FILES['files']['name'][$index];

            $filePath = $swapdir . $filename;
            move_uploaded_file($tmpName, $filePath);
            $filenames[] = $filename;
        }
        echo json_encode($filenames);
        exit;
    }
}

?>