<?php

// 获取数据库连接
function getDb() {
  $db = new PDO("mysql:host=localhost:3306;dbname=art", 'root', 'gansui');
  $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  return $db;
}

// 获取评论树
function getCommentTree() {
  $db = getDb();
  $stmt = $db->query('SELECT * FROM comment ORDER BY created_at DESC');
  $comment = array();
  while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    $comment = array(
      'id' => $row['id'],
      'PaintingID' => $row['PaintingID'],
      'parent_id' => $row['parent_id'],
      'author' => $row['author'],
      'comment_text' => $row['comment_text'],
      'created_at' => $row['created_at'],
      'children' => array()
    );
    if ($comment['parent_id'] == null) {
      // 如果是根评论，则加入评论树
      $comment[] = $comment;
    } else {
      // 否则，加入父评论的 children 数组中
      $parent = findCommentById($comment, $comment['parent_id']);
      $parent['children'][] = $comment;
    }
  }
  return $comment;
}

// 根据 ID 查找评论
function findCommentById($comment, $id) {
  foreach ($comment as $comment) {
    if ($comment['id'] == $id) {
      return $comment;
    }
    $child = findCommentById($comment['children'], $id);
    if ($child != null) {
      return $child;
    }
  }
  return null;
}

// 提交评论
function submitComment($author, $comment_text, $parent_id = null) {
  $db = getDb();
  $stmt = $db->prepare('INSERT INTO comment (author, comment_text, parent_id) VALUES (?, ?, ?)');
  $stmt->execute(array($author, $comment_text, $parent_id));
}

// 处理评论提交请求
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  // 从 POST 数据中获取评论信息
  $author = $_POST['author'];
  $comment_text = $_POST['comment_text'];
  $parent_id = isset($_POST['parent_id']) ? $_POST['parent_id'] : null;
  // 提交评论
  submitComment($author, $comment_text, $parent_id);
  // 返回成功响应
  header('Content-Type: application/json');
  echo json_encode(array('status' => 'success'));
  exit();
}

// 处理评论获取请求
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
  // 获取评论树
  $comment = getCommentTree();
  // 返回评论树
  header('Content-Type: application/json');
  echo json_encode($comment);
  exit();
}

?>