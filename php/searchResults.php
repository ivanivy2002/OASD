<?php
$host = 'localhost:3306';
$db = 'art';
$user = 'root';
$pass = 'gansui';
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$opt = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES => false,
];
$pdo = new PDO($dsn, $user, $pass, $opt);


$keyword = $_GET['name'] ?? $_GET['author'];
$field = array_key_exists('Title', $_GET) ? 'Title' : 'Author';
$sortField = 'Cost';
$sortOrder = 'ASC';

if ($_GET['sort']) {
    switch ($_GET['sort']) {
        case 'CostAsc':$sortField = 'Cost';
            $sortOrder = 'ASC';
            break;
        case 'CostDesc':$sortField = 'Cost';
            $sortOrder = 'DESC';
            break;
        case 'YearOfWorkAsc':$sortField = 'YearOfWork';
            $sortOrder = 'ASC';
            break;
        case 'YearOfWorkDesc':$sortField = 'YearOfWork';
            $sortOrder = 'DESC';
            break;
    }
}

$page = $_GET['page'] ?? 1;
$resultsPerPage = 5;
$offset = ($page - 1) * $resultsPerPage;

$stmt = $pdo->prepare("SELECT * FROM paintings WHERE $field LIKE ? ORDER BY $sortField $sortOrder LIMIT $resultsPerPage OFFSET $offset");
$stmt->execute(["%$keyword%"]);
$artworks = $stmt->fetchAll();

$stmt = $pdo->prepare("SELECT COUNT(*) FROM paintings WHERE $field LIKE ?");
$stmt->execute(["%$keyword%"]);
$totalCount = $stmt->fetchColumn();

echo json_encode(['artworks' => $artworks, 'totalCount' => $totalCount]);
