<?php

ini_set('display_errors', 1);

/* Setting up the GET parameters */
if(isset($_GET['submissionId'])){
    $submission_id = htmlspecialchars($_GET['submissionId']);
}
if(isset($_GET['expected'])){
    $expected = htmlspecialchars($_GET['expected']); # Either "image" or "xml"
}
if(isset($_GET['imageName'])){
    $imageName = htmlspecialchars($_GET['imageName']); # if $expected = "image"
}

/* Setting up the database */
$db_username = '<your_mysql_username>'; # MySQL Username
$db_password = '<your_mysql_password>'; # MySQL Password
$db_host = 'localhost'; # MySQL Server // localhost by default, if your database is hosted elsewhere ajust accordingly
$db_name = '<your_ojs_database_name>'; # MySQL Database name
$db = new PDO("mysql:host=$db_host;dbname=$db_name;charset=UTF8",$db_username,$db_password);

/* Getting the XML's fileId */
$query = "SELECT max(file_id) AS file_id,max(revision) AS revision FROM `submission_files` WHERE submission_id = $submission_id AND file_type = 'text/xml';";
$stmt = $db->prepare($query);
$stmt->execute();
$rows = $stmt->fetch(PDO::FETCH_ASSOC);
$file_id = $rows['file_id'];

if(!isset($expected) || $expected == 'xml'){

    echo $file_id;

} else if($expected == 'image' || $expected == 'img'){

    $query = "SELECT `file_id` FROM `submission_files` WHERE file_type LIKE '%image/%' AND submission_id = $submission_id AND assoc_id = $file_id AND original_file_name = '$imageName';";
    $stmt = $db->prepare($query);
    $stmt->execute();
    $rows = $stmt->fetch(PDO::FETCH_ASSOC);
    $img_file_id = $rows['file_id'];

    echo $img_file_id;
}

?>