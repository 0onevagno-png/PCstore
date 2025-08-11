<?php
// Заголовки
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

// Получение JSON из тела запроса
$data = file_get_contents("php://input");
if (!$data) {
  http_response_code(400);
  echo json_encode(["error" => "Нет данных"]);
  exit;
}

// Путь к JSON-файлу
$file = __DIR__ . "/../data/amdBuilds.json";

// Сохраняем
if (file_put_contents($file, $data)) {
  echo json_encode(["success" => true]);
} else {
  http_response_code(500);
  echo json_encode(["error" => "Ошибка при записи"]);
}