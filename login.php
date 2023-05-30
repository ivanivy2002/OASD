<?php
// 获取 POST 请求参数
$username = $_POST["username"];
$password = $_POST["password"];

// 假设正确的用户名和密码为 admin 和 123456
if ($username === "admin" && $password === "123") {
  // 登录成功，将用户重定向到主页
  header("Location: http://localhost:3000/index.html");
  echo "success";
  exit;
} else {
  echo "failure";
}
