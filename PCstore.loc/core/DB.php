<?php
class DB {

    private static $instance = null;


    private $pdo;

    private function __construct() {
        $config = require __DIR__ . '/../bd.php';

        $dsn = "mysql:host={$config['host']};dbname={$config['db_name']};charset={$config['charset']}";

        try {
            $this->pdo = new PDO($dsn, $config['username'], $config['password'], $config['options']);
        } catch (PDOException $e) {
            die("Ошибка подключения к БД: " . $e->getMessage());
        }
    }


    public static function getInstance(): DB {
        if (self::$instance === null) {
            self::$instance = new DB();
        }
        return self::$instance;
    }

    public function getConnection(): PDO {
        return $this->pdo;
    }
}