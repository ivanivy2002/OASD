<?php
session_start(); // 开始会话
$username = $_SESSION['username']; // 获取当前用户的用户名

try {
    $conn = new PDO("mysql:host=localhost:3306;dbname=art", 'root', 'gansui'); // 连接数据库
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); // 设置错误模式为异常模式

    $conn->beginTransaction(); // 开始事务

    // 查询购物车中所有艺术品的总价值
    $stmt = $conn->prepare('SELECT SUM(paintings.Cost) FROM cart INNER JOIN paintings ON cart.PaintingID = paintings.PaintingID WHERE cart.username = :username');
    $stmt->execute([':username' => $username]);
    $totalPrice = $stmt->fetchColumn();

    // 查询当前用户的余额
    $stmt = $conn->prepare('SELECT balance FROM users WHERE username = :username');
    $stmt->execute([':username' => $username]);
    $balance = $stmt->fetchColumn();

    // 如果余额不足，则回滚事务并返回错误信息
    if ($balance < $totalPrice) {
        echo json_encode(['success' => false, 'message' => 'Insufficient balance']);
        $conn->rollBack();
        return;
    }

    // 更新购物车中所有艺术品的状态为已售出
    $stmt = $conn->prepare('UPDATE paintings INNER JOIN cart ON paintings.PaintingID = cart.PaintingID SET paintings.status = 1 WHERE cart.username = :username');
    $stmt->execute([':username' => $username]);

    // 查询购物车中所有艺术品的发布者的用户名
    $stmt = $conn->prepare('SELECT DISTINCT users.username FROM cart INNER JOIN paintings ON cart.PaintingID = paintings.PaintingID INNER JOIN users ON paintings.username = users.username WHERE cart.username = :username');
    $stmt->execute([':username' => $username]);
    $sellerUsername = $stmt->fetchColumn();

    // 更新购买者的余额
    $stmt = $conn->prepare('UPDATE users SET balance = balance - :totalPrice WHERE username = :username');
    $stmt->execute([':username' => $username, ':totalPrice' => $totalPrice]);

    // 更新发布者的余额
    $stmt = $conn->prepare('UPDATE users SET balance = balance + :totalPrice WHERE username = :username');
    $stmt->execute([':username' => $sellerUsername, ':totalPrice' => $totalPrice]);

    // 清空购物车
    $stmt = $conn->prepare('DELETE FROM cart WHERE username = :username');
    $stmt->execute([':username' => $username]);

    $conn->commit(); // 提交事务

    echo json_encode(['success' => true]); // 返回成功信息

} catch (PDOException $e) {
    $conn->rollBack(); // 回滚事务
    echo 'Error: ' . $e->getMessage(); // 返回错误信息
}

$conn = null; // 关闭数据库连接
