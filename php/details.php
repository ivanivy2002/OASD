<?php
$servername = "localhost:3306";
$username = "root";
$password = "gansui"; // switch to your own root password
$conn = new mysqli($servername, $username, $password);
if ($conn->connect_error) {
    die("Conn failed: " . $conn->connect_error);
}
$conn->select_db("art");
// // 获取id参数 
// $id = $_GET['id'];

// // 根据id从数据库获取详情信息
// $sql = "SELECT * FROM paintings WHERE PaintingId= $id";
// $result = $conn->query($sql);
// $card = $result->fetch_assoc();

// 获取id参数 
$id = intval($_GET['id']);

// 根据id从数据库获取详情信息
$sql = "SELECT * FROM paintings WHERE PaintingId = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id);
$stmt->execute();
$card = $stmt->get_result()->fetch_assoc();

header('Content-Type: application/json');
$json=json_encode($card);
// echo $card;
// echo "\n***\n";
// echo "\n***\n";
echo $json;


// if ($result->num_rows > 0) {
//     $row = $result->fetch_assoc();
//     $json = json_encode($row);
//     if ($json) {
//         echo $json;
//     } else {
//         echo "JSON encoding failed";
//     }
// } else {
//     echo "Painting Not Found.";
//     echo "failure";
//     exit;
// }
?>

