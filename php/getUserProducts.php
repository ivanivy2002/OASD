<?php
session_start();
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$servername = "localhost:3306";
$username = "root";
$password = "gansui";

$conn = new mysqli($servername, $username, $password);
$conn->select_db("art");

try {
    if (!isset($_SESSION['username'])) {
        throw new Exception('No username in session');
    }

    $stmt = $conn->prepare('SELECT PaintingID, Title, Author, Description, YearOfWork,  Size, Cost, status, ImageFileName FROM paintings WHERE username = ?');
    $stmt = $conn->prepare('SELECT PaintingID, Title, Author, Description, YearOfWork,  Size, Cost, status, ImageFileName FROM paintings WHERE username = ?');
    $stmt->bind_param("s", $_SESSION['username']);
    $stmt->execute();
    // $stmt->execute([$_SESSION['username']]);
    $paintings = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);

    // Change image filename to URL
    // foreach ($paintings as &$artwork) {
    //     $artwork['ImageFileName'] = '../assets/images/works/small/' . $artwork['ImageFileName'];
    // }

    echo json_encode(['success' => true, 'paintings' => $paintings]);
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode(['error' => $e->getMessage()]);
}
