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
$sql = "SELECT * FROM artists WHERE ArtistID = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id);
$stmt->execute();
$card = $stmt->get_result()->fetch_assoc();

header('Content-Type: application/json');
$json=json_encode($card);

echo $json;


?>

