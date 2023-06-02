<?php
require_once "./request.php";
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
session_start();
$servername = "localhost:3306";
$userId = "root";
$password = "gansui"; // switch to your own root password
$conn = new mysqli($servername, $userId, $password);
if ($conn->connect_error) {
    die("Conn failed: " . $conn->connect_error);
}
// echo "Conn established<br>";
// switch into art database
$conn->select_db("art");

$artworkId = $_POST['id'];
$userId = $_SESSION['userId'];
// if ($_SERVER["REQUEST_METHOD"] == "POST") {
// 获取用户提交的表单数据
// $request_body = file_get_contents('php://input');
// 解析请求数据
// $data = json_decode($request_body);
// 现在 $data 变量包含了请求 body 中的数据
// $data = getObjectFromBody();
// echo $data;
// $PaintingID=0;
// $userId=0;
try {
    // Check if the paintings is already sold
    $stmt = $conn->prepare('SELECT status FROM paintings WHERE PaintingID = ?');
    $stmt->bind_param('i', $artworkId);
    $stmt->execute();

    $result = $stmt->get_result();
    if ($result->num_rows === 0) {
        throw new Exception('No such paintings');
    }

    $paintings = $result->fetch_assoc();
    if ($paintings['status'] === '1') {
        throw new Exception('paintings is already sold');
    }

    // Check if the paintings is already in the cart
    $stmt = $conn->prepare('SELECT PaintingID FROM cart WHERE userId = ? AND PaintingID = ?');
    $stmt->bind_param('si', $userId, $artworkId);
    $stmt->execute();
    $num = 1;

    $result = $stmt->get_result();
    if ($result->num_rows > 0) {
        // $paintings = $result->fetch_assoc();
        throw new Exception('Already in the cart');
        // $stmt = $conn->prepare('UPDATE cart SET num = num + 1 WHERE PaintingID = ?');
        // $stmt->bind_param('i',  $artworkId);
        // $stmt->execute();
    } else {
        $status = 0;
        // Add the paintings to the cart
        $stmt = $conn->prepare('INSERT INTO cart (userId, PaintingID, status,num) VALUES (?, ?, ?,?)');
        $stmt->bind_param('sisi', $userId, $artworkId, $status, $num);
        $stmt->execute();
    }



    echo json_encode(['success' => true]);
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode(['error' => $e->getMessage()]);
}


    // $PaintingID = intval($data->PaintingID);
    // echo $PaintingID;
    // $userId = intval($data->userId);
    // echo $userId;
    // // $PaintingID = $data['PaintingID'];
    // // $userId = $data['userId'];
    // $errors = [];
    // // mysqli_select_db($conn, MYSQL_DATABASE);
    // $query = "SELECT * FROM cart WHERE PaintingID='$PaintingID' AND userId = '$userId' LIMIT 1";
    // $result = mysqli_query($conn, $query);
    // if (mysqli_num_rows($result) > 0) {
    //     $cart = mysqli_fetch_assoc($result);
    //     // 验证密码
    //     // $hashedPassword = hashPassword($password, $user['salt']);
    //     // $hashedPassword = $password;
    //     $cart['num'] = $cart['num'] + 1;
    //     //登陆成功
    //     $response = [
    //         'success' => true,
    //         'message' => '添加成功!',
    //         'data' => $cart['id']
    //     ];
    // } else {
    //     //添加记录
    //     $sql = "INSERT INTO cart (PaintingID, userId, num) VALUES ('$PaintingID', '$userId', 1)";
    //     if ($conn->query($sql) === TRUE) {
    //         echo "New record created successfully <br>";
    //         $response = [
    //             'success' => true,
    //             'message' => '新加成功!',
    //             'data' => $cart['id']
    //         ];
    //     } else {
    //         echo "Error: " . $sql . "<br>" . $conn->error;
    //     }
    // }
    // // 将响应数据以 JSON 格式返回给前端
    // header('Content-Type: application/json');
    // echo json_encode($response);
// } else {
    // echo "damn";
// }

// $request_body = file_get_contents('php://input');
// 解析原始数据，获取请求 body 中的数据
// $data = json_decode($request_body, true);
// echo $data;
// // 获取 POST 请求参数
// // $data = getObjectFromBody();
// $userId = $data->userId;
// $password = $data->password;
// // var_dump($_POST); // print the contents of the $_POST array
// // $userId = $_POST["userId"];
// // $password = $_POST["password"];
// var_dump($userId); // print the value of $userId
// var_dump($password); // print the value of $password
// $sql = "SELECT * FROM users WHERE userId = ?";
// $stmt = $conn->prepare($sql);
// $stmt->bind_param("s", $userId);
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
//     //   'userId' => $row['userId'],
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
//   echo "userId not found.";
//   echo "failure";
//   exit;
// }