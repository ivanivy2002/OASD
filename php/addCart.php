<?php
require_once "./request.php";
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

// if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // 获取用户提交的表单数据
    $request_body = file_get_contents('php://input');
    // 解析请求数据
    $data = json_decode($request_body);
    // 现在 $data 变量包含了请求 body 中的数据
    // $data = getObjectFromBody();
    // echo $data;
    $PaintingID = $data->PaintingID;
    echo $PaintingID;
    $userId = $data->userId;
    echo $userId;
    // $PaintingID = $data['PaintingID'];
    // $userId = $data['userId'];
    $errors = [];
    // mysqli_select_db($conn, MYSQL_DATABASE);
    $query = "SELECT * FROM cart WHERE PaintingID='$PaintingID' AND userId = '$userId' LIMIT 1";
    $result = mysqli_query($conn, $query);
    if (mysqli_num_rows($result) > 0) {
        $cart = mysqli_fetch_assoc($result);
        // 验证密码
        // $hashedPassword = hashPassword($password, $user['salt']);
        // $hashedPassword = $password;
        $cart['num'] = $cart['num'] + 1;
        //登陆成功
        $response = [
            'success' => true,
            'message' => '添加成功!',
            'data' => $cart['id']
        ];
    } else {
        //添加记录
        $sql = "INSERT INTO cart (PaintingID, userId, num) VALUES ('$PaintingID', '$userId', 1)";
        if ($conn->query($sql) === TRUE) {
            echo "New record created successfully <br>";
            $response = [
                'success' => true,
                'message' => '新加成功!',
                'data' => $cart['id']
            ];
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
    }
    // 将响应数据以 JSON 格式返回给前端
    header('Content-Type: application/json');
    echo json_encode($response);
// } else {
    // echo "damn";
// }

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
