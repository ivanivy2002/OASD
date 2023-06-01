<?php
$servername = "localhost:3306";
$username = "root";
$password = "gansui"; // switch to your own root password
$conn = new mysqli($servername, $username, $password);
if ($conn->connect_error) {
    die("Conn failed: " . $conn->connect_error);
}
// echo "Conn established <br>";
// switch into art database
$conn->select_db("art");


$sql = "SELECT * FROM paintings";

// // 设置响应头
header('Content-Type: application/json');

// echo htmlspecialchars("<script>window.alert = function() {}; window.confirm = function(){return true;};</script>");
if ($result = $conn->query($sql)) {
    $data = [];
    // $data['mute'] = true;
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
    // 此时$data已经存满数据
    // 输出数据  
    foreach ($data as $row) {
        // echo "id: " . $row["PaintingID"] . " - Title: " . $row["Title"] . " - ArtistID: " .
        //     $row["ArtistID"] . "<br>";
    }
    $json = json_encode($data);
    if ($json) {
        echo $json;
    } else {
        echo "JSON encoding failed";
    }
} else {
    echo "SQL Query Failed: " . $conn->error;
}
  
// $result = $conn->query($sql);

// $data = [];
// while($row = $result->fetch_assoc()) {
//   $data[] = $row;
// }

// echo json_encode($data);
