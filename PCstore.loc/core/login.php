<?php

session_start();
header('Content-Type: application/json; charset=utf-8');

require_once __DIR__ . '/DB.php';

try {
    $data = json_decode(file_get_contents('php://input'), true);
    $identifier = $data['identifier'] ?? '';
    $password = $data['password'] ?? '';

    $db = DB::getInstance()->getConnection();

    $stmt = $db->prepare("
        SELECT users_id, email, phone, password,  is_admin 
        FROM users 
        WHERE email = :identifier OR phone = :identifier
    ");
    $stmt->execute(['identifier' => $identifier]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($password, $user['password'])) {
        $_SESSION['user_id'] = $user['users_id'];
        $_SESSION['user_email'] = $user['email'];
        $_SESSION['user_phone'] = $user['phone'];
        
        echo json_encode(['success' => true, 'user' => [
            'id' => $user['users_id'],
            'email' => $user['email'],
            'phone' => $user['phone'],
            'is_admin' => $user['is_admin'],
        ]]);
        exit;
    } else {
        echo json_encode(['success' => false, 'errors' => ['Неверный логин или пароль']]);
        exit;
    }
} catch (Exception $e) {
    // Логируй $e->getMessage() куда-нибудь или показывай
    echo json_encode(['success' => false, 'errors' => ['Ошибка сервера: ' . $e->getMessage()]]);
    exit;
}