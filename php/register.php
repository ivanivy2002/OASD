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
$sex = $_POST['sex'];
$birthday = empty($_POST['birthday']) ? '1900-01-01' : $_POST['birthday']; // 如果生日为空，则设置为 1900-01-01
$nationality = $_POST['nationality'];
$hash = password_hash($password, PASSWORD_BCRYPT);

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
  $stmt = $conn->prepare("INSERT INTO users (username, password, email, tel, sex, birthday, nationality) VALUES (?, ?, ?, ?, ?, ?, ?)");
  $stmt->bind_param("sssssss", $username, $hash, $email, $tel, $sex, $birthday, $nationality);
  // 执行 SQL 语句
  if ($stmt->execute()) {
    $stmt = $conn->prepare("UPDATE users SET balance = 0 WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    echo "Registration successful."; // 注册成功
  } else {
    echo "Error: " . $stmt->error; // 注册失败
  }
  // $sql = "INSERT INTO users (username, password, email, tel, address) VALUES ('$username', '$password', '$email','$tel','$address')";
  // if ($conn->query($sql) === TRUE) {
  //   echo "New record created successfully<br>";
  // } else {
  //   echo "Error: " . $sql . "<br>" . $conn->error;
  // }
  // 用户名可用
}



// 假设正确的用户名和密码为 admin 和 123456
// if ($username === "admin" && $password === "123") {
//   // 登录成功，将用户重定向到主页
//   header("Location: ../index.html");
//   // header("Location: http://localhost/OASD/index.html");
//   echo "success";
//   exit;
// } else {
//   header("Location: ../login.html"); //失败,重定向到登录
//   echo "failure";
// }
