<?php
/*
 * @Author: ZMark
 * @Date: 2023-05-25 13:31:29
 * @LastEditors: ZMark
 * @LastEditTime: 2023-05-30 10:25:59
 * @FilePath: \Artistic-Realm\ar-rear\api\login.php
 * @Description: 处理登陆请求，如果登陆成功则success为true，data为userId；注册失败则为false，errors为错误信息列表
 * 
 * Copyright (c) 2023 by ZMark, All Rights Reserved. 
 */
require_once "../common/mysql.php";
require_once "../common/hash_salt.php";
require_once "../common/cors.php";
require_once "../common/request.php";

// 连接数据库
$conn = getMySQLConn();

// 处理登录请求
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // 获取用户提交的表单数据
    $data = getObjectFromBody();
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
        mysqli_select_db($conn, MYSQL_DATABASE);
        $query = "SELECT * FROM users WHERE username='$username' LIMIT 1";
        $result = mysqli_query($conn, $query);

        if (mysqli_num_rows($result) > 0) {
            $user = mysqli_fetch_assoc($result);
            // 验证密码
            $hashedPassword = hashPassword($password, $user['salt']);
            if ($hashedPassword == $user['hashed_password']) {
                //登陆成功
                $response = [
                    'success' => true,
                    'message' => '登陆成功!',
                    'data' => $user['id']
                ];
            } else {
                // 登录失败
                $errors[] = "密码错误";
                $response = [
                    'success' => false,
                    'message' => '登陆失败!',
                    'errors' => $errors
                ];
            }
        } else {
            $errors[] = "用户名不存在";
            $response = [
                'success' => false,
                'message' => '登陆失败!',
                'errors' => $errors
            ];
        }
    }
    // 将响应数据以 JSON 格式返回给前端
    header('Content-Type: application/json');
    echo json_encode($response);
}
// 关闭数据库连接
closeConnection($conn);
