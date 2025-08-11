<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");


require_once __DIR__ . '/../core/DB.php';

$db = DB::getInstance()->getConnection();
$data = $db->query("SELECT * FROM gpus")->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($data);