<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
// Start a session (if one has not already been started)
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}
require_once "./request.php";
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


if ($_SERVER["REQUEST_METHOD"] == "POST") {
  // 获取用户提交的表单数据
  if (isset($_SERVER['CONTENT_TYPE']) && $_SERVER['CONTENT_TYPE'] === 'application/json') {
    // 读取原始请求数据
    $request_body = file_get_contents('php://input');
    // 解析请求数据
    $data = json_decode($request_body);
    // 现在 $data 变量包含了请求 body 中的数据
  } else {
    // Content-Type 不是 application/json，处理错误
    // ...
    echo "isset undef";
  }
  // $data = getObjectFromBody();
  // echo $data;
  $username = $data->username;
  $password = $data->password;

  // 字段验证
  $errors = [];
  // 用户名不能为空
  if (empty($username)) {
    $errors[] = "用户名不能为空";
  }
  // 密码不能为空
  if (empty($password)) {
    $errors[] = "密码不能为空";
  }

  // 如果存在错误，返回错误信息
  if (!empty($errors)) {
    $response = [
      'success' => false,
      'message' => '登陆!',
      'errors' => $errors
    ];
  } else {
    // 在数据库中查询用户信息
    // mysqli_select_db($conn, MYSQL_DATABASE);
    $query = "SELECT * FROM users WHERE username='$username' LIMIT 1";
    $result = mysqli_query($conn, $query);

    // if (mysqli_num_rows($result) > 0) {
      $user = mysqli_fetch_assoc($result);
      // 验证密码
      // $hashedPassword = hashPassword($password, $user['salt']);
      // $hashedPassword = $password;
      
      if (password_verify($password, $user['password'])) {
        //登陆成功
        $_SESSION['username'] = $username;
        $response = [
          'success' => true,
          'message' => '登陆成功!',
          'data' => $user['userId']
        ];
        $_SESSION['userId'] = $user['userId'];
        
      } else {
        // 登录失败
        $errors[] = "密码错误";
        $response = [
          'success' => false,
          'message' => '登陆失败!',
          'errors' => $errors
        ];
      }
    } 
    // else {
    //   $errors[] = "用户名不存在";
    //   $response = [
    //     'success' => false,
    //     'message' => '登陆失败!',
    //     'errors' => $errors
    //   ];
    // }
  // }
  // 将响应数据以 JSON 格式返回给前端
  header('Content-Type: application/json');
  echo json_encode($response);
}
else{
  echo "damn";
}

// $request_body = file_get_contents('php://input');
// 解析原始数据，获取请求 body 中的数据
// $data = json_decode($request_body, true);
// echo $data;
// // 获取 POST 请求参数
// // $data = getObjectFromBody();
// $username = $data->username;
// $password = $data->password;
// // var_dump($_POST); // print the contents of the $_POST array
// // $username = $_POST["username"];
// // $password = $_POST["password"];
// var_dump($username); // print the value of $username
// var_dump($password); // print the value of $password
// $sql = "SELECT * FROM users WHERE username = ?";
// $stmt = $conn->prepare($sql);
// $stmt->bind_param("s", $username);
// $stmt->execute();
// $result = $stmt->get_result();

// header('Content-Type: application/json');

// if ($result->num_rows > 0) {
//   $row = $result->fetch_assoc();
//   if ($row['password'] == $password) {
//     // 密码正确
//     // header("Location: ../index.html");
//     // 登录成功，将用户重定向到主页
//     $json = json_encode($row);
//     // $json = json_encode([
//     //   'success' => true,
//     //   'username' => $row['username'],
//     //   'userId' => $row['userId']
//     // ]);
//     if ($json) {
//       echo $json;
//     } else {
//       echo "JSON encoding failed";
//     }
//     // header("Location: http://localhost/OASD/index.html");
//     // echo "success";
//   } else {
//     // echo "Incorrect password.";
//     echo json_encode(['success' => false]);
//     // header("Location: ../login.html"); //失败,重定向到登录
//     // echo "failure";
//     exit;
//   }
// } else {
//   echo "Username not found.";
//   echo "failure";
//   exit;
// }
