<?php
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
