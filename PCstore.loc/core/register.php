<?php
// Включаем отображение ошибок для отладки (только для dev)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once __DIR__ . '/DB.php';

// Заголовки CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Обработка preflight запроса OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Обрабатываем только POST запросы
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'errors' => ['Неверный метод запроса. Ожидается POST.']
    ]);
    exit;
}

// Получаем данные JSON из тела запроса
$data = json_decode(file_get_contents('php://input'), true);

$identifier = trim($data['identifier'] ?? '');
$password = trim($data['password'] ?? '');
$errors = [];

// Валидация пароля
if (strlen($password) < 8) {
    $errors[] = 'Пароль должен быть не менее 8 символов.';
}

// Проверяем, email или телефон
$isEmail = filter_var($identifier, FILTER_VALIDATE_EMAIL);
$isPhone = preg_match('/^\+?[0-9]{10,15}$/', $identifier);

if (!$isEmail && !$isPhone) {
    $errors[] = 'Введите корректный Email или номер телефона.';
}

// Если есть ошибки — выводим и завершаем
if (!empty($errors)) {
    echo json_encode(['success' => false, 'errors' => $errors]);
    exit;
}

$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

try {
    $pdo = DB::getInstance()->getConnection();

    // Проверка, что пользователь с таким email или телефоном не существует
    if ($isEmail) {
        $stmt = $pdo->prepare("SELECT users_id FROM users WHERE email = ?");
    } else {
        $stmt = $pdo->prepare("SELECT users_id FROM users WHERE phone = ?");
    }
    $stmt->execute([$identifier]);

    if ($stmt->fetch()) {
        echo json_encode(['success' => false, 'errors' => ['Пользователь уже существует.']]);
        exit;
    }

    // Вставляем нового пользователя
    if ($isEmail) {
        $stmt = $pdo->prepare("INSERT INTO users (email, password, created_at) VALUES (?, ?, NOW())");
    } else {
        $stmt = $pdo->prepare("INSERT INTO users (phone, password, created_at) VALUES (?, ?, NOW())");
    }
    $stmt->execute([$identifier, $hashedPassword]);

    echo json_encode(['success' => true]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'errors' => ['Ошибка БД: ' . $e->getMessage()]]);
}