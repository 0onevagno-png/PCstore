<?php
require_once '../core/DB.php';

header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"), true);
$identifier = $data['identifier'] ?? '';  // Может email или phone
$password = $data['password'] ?? '';

if (!$identifier || !$password) {
    echo json_encode(["success" => false, "error" => "Поля не заполнены"]);
    exit;
}

// Попробуем найти по email или телефону
$stmt = $pdo->prepare("SELECT * FROM users WHERE email = ? OR phone = ?");
$stmt->execute([$identifier, $identifier]);
$user = $stmt->fetch();

if ($user && password_verify($password, $user['password'])) {
    // Возвращаем данные пользователя, в том числе is_admin (как строка или число)
    echo json_encode([
        "success" => true,
        "user" => [
            "id" => $user['users_id'],          
            "email" => $user['email'],
            "phone" => $user['phone'],
            "is_admin" => $user['is_admin'],
        ]
    ]);
} else {
    echo json_encode(["success" => false, "error" => "Неверный логин или пароль"]);
}