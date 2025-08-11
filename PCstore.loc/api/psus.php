<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

header('Content-Type: application/json');

require_once '../core/DB.php';

$db = DB::getInstance()->getConnection();
$data = $db->query("SELECT * FROM psus")->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($data);