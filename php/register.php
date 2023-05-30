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

// 获取 POST 请求参数
$username = $_POST["username"];
$password = $_POST["password"];
$email = $_POST["email"];
$tel = $_POST["tel"];
$address = $_POST["address"];

$sql = "SELECT * FROM users WHERE username = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
  echo "Username already exists.";
  // 用户名已存在
} else {
  echo "Username OK.";
  //insertion
  $sql = "INSERT INTO users (username, password, email, tel, address) VALUES ('$username', '$password', '$email','$tel','$address')";
  if ($conn->query($sql) === TRUE) {
    echo "New record created successfully<br>";
  } else {
    echo "Error: " . $sql . "<br>" . $conn->error;
  }
  // 用户名可用
}



// 假设正确的用户名和密码为 admin 和 123456
if ($username === "admin" && $password === "123") {
  // 登录成功，将用户重定向到主页
  header("Location: ../index.html");
  // header("Location: http://localhost/OASD/index.html");
  echo "success";
  exit;
} else {
  header("Location: ../login.html"); //失败,重定向到登录
  echo "failure";
}
