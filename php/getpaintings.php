<?php
$servername = "localhost:3306";
$username = "root";
$password = "gansui"; // switch to your own root password
$conn = new mysqli($servername, $username, $password);
if ($conn->connect_error) {
    die("Conn failed: " . $conn->connect_error);
}
echo "Conn established<br>";
// switch into art database
$conn->select_db("art");


$sql = "SELECT * FROM paintings";

if ($result = $conn->query($sql)) {
    $data = [];
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
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
