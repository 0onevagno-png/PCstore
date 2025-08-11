<?php
return [
    'host' => 'MySQL-8.2',            
    'db_name' => 'pcstore',        
    'username' => 'root',
    'password' => '',
    'charset' => 'utf8',
    'options' => [
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, // для ошибок
    ],
];