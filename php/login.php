<?php
// print_r($_POST);
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
// var_dump($username); // string(5) "admin"
// var_dump($password); // string(5) "admin"
$sql = "SELECT * FROM users WHERE username = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();

header('Content-Type: application/json');

if ($result->num_rows > 0) {
  $row = $result->fetch_assoc();
  if ($row['password'] == $password) {
    // 密码正确
    // header("Location: ../index.html");
    // 登录成功，将用户重定向到主页
    $json= json_encode($row);
    // $json = json_encode([
    //   'success' => true,
    //   'username' => $row['username'],
    //   'userId' => $row['userId']
    // ]);
    if ($json) {
      echo $json;
    } else {
      echo "JSON encoding failed";
    }
    // header("Location: http://localhost/OASD/index.html");
    // echo "success";
  } else {
    // echo "Incorrect password.";
    echo json_encode(['success' => false]);
    // header("Location: ../login.html"); //失败,重定向到登录
    // echo "failure";
    exit;
  }
} else {
  echo "Username not found.";
  echo "failure";
  exit;
}


// // 假设正确的用户名和密码为 admin 和 123456
// if ($username === "admin" && $password === "123") {

//   exit;
// } else {
// }
