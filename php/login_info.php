<?php
$servername = "localhost:3306";
$username = "root";
$password = "gansui"; // switch to your own root password
$conn = new mysqli($servername, $username, $password);
if ($conn->connect_error) {
    die("Conn failed: " . $conn->connect_error);
}
// echo "Conn established<br>";
// switch into art database
$conn->select_db("art");

// 获取 POST 请求参数
$username = $_POST["username"];
$password = $_POST["password"];
var_dump($username); // string(5) "admin"
var_dump($password); // string(5) "admin"
$sql = "SELECT * FROM users WHERE username = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    if ($row['password'] == $password) {
        // 密码正确
        //TODO:将$row['id'] 和 $row['username']作为data 传回
        $data = [
            'id' => $row['id'],
            'username' => $row['username']
        ];
        echo json_encode($data);
        // echo "success";
    } else {
        echo "Incorrect password.";
        // header("Location: ../login.html"); //失败,重定向到登录
        echo "failure";
        exit;
    }
} else {
    echo "Username not found.";
    echo "failure";

    exit;
}
