-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Хост: MySQL-8.2
-- Время создания: Июл 27 2025 г., 02:37
-- Версия сервера: 8.2.0
-- Версия PHP: 8.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `PCstore`
--

-- --------------------------------------------------------

--
-- Структура таблицы `cases`
--

CREATE TABLE `cases` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `form_factor` varchar(50) DEFAULT NULL,
  `color` varchar(50) DEFAULT NULL,
  `description` text,
  `price` decimal(10,2) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `cases`
--

INSERT INTO `cases` (`id`, `name`, `form_factor`, `color`, `description`, `price`, `image`) VALUES
(1, 'Zalman S2', 'ATX', 'Черный', 'Корпус с боковым окном и хорошей вентиляцией.', 39.99, 'zalman_s2.jpg'),
(2, 'NZXT H510', 'ATX', 'Белый', 'Стильный корпус для геймеров.', 69.99, 'nzxt_h510.jpg');

-- --------------------------------------------------------

--
-- Структура таблицы `coolings`
--

CREATE TABLE `coolings` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `type` varchar(50) DEFAULT NULL,
  `socket_compatibility` text,
  `description` text,
  `price` decimal(10,2) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `coolings`
--

INSERT INTO `coolings` (`id`, `name`, `type`, `socket_compatibility`, `description`, `price`, `image`) VALUES
(1, 'DEEPCOOL GAMMAXX 400 V2', 'Air', 'LGA1700,AM4', 'Хорошее воздушное охлаждение с подсветкой.', 29.99, 'gammaxx_400.jpg'),
(2, 'NZXT Kraken X63', 'Liquid', 'LGA1700,AM4', 'СЖО с RGB и отличным охлаждением.', 139.99, 'kraken_x63.jpg');

-- --------------------------------------------------------

--
-- Структура таблицы `cpus`
--

CREATE TABLE `cpus` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `brand` varchar(50) DEFAULT NULL,
  `cores` int DEFAULT NULL,
  `threads` int DEFAULT NULL,
  `base_clock` decimal(4,2) DEFAULT NULL,
  `boost_clock` decimal(4,2) DEFAULT NULL,
  `socket` varchar(50) DEFAULT NULL,
  `description` text,
  `price` decimal(10,2) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `cpus`
--

INSERT INTO `cpus` (`id`, `name`, `brand`, `cores`, `threads`, `base_clock`, `boost_clock`, `socket`, `description`, `price`, `image`) VALUES
(1, 'Intel Core i5-12400F', 'Intel', 6, 12, 2.50, 4.40, 'LGA1700', 'Процессор Intel 12-го поколения с отличной производительностью.', 149.99, 'intel_i5_12400f.jpg'),
(2, 'AMD Ryzen 5 5600X', 'AMD', 6, 12, 3.70, 4.60, 'AM4', 'Процессор AMD с высокой производительностью на ядро.', 159.99, 'amd_ryzen_5_5600x.jpg');

-- --------------------------------------------------------

--
-- Структура таблицы `gpus`
--

CREATE TABLE `gpus` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `vram` int DEFAULT NULL,
  `base_clock` int DEFAULT NULL,
  `boost_clock` int DEFAULT NULL,
  `description` text,
  `price` decimal(10,2) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `gpus`
--

INSERT INTO `gpus` (`id`, `name`, `vram`, `base_clock`, `boost_clock`, `description`, `price`, `image`) VALUES
(1, 'NVIDIA GeForce RTX 3060 12GB', 12, 1320, 1777, 'Игровая видеокарта с поддержкой RayTracing и DLSS.', 299.99, 'rtx_3060.jpg'),
(2, 'AMD Radeon RX 6600 XT 8GB', 8, 1968, 2589, 'Отличный выбор для 1080p и 1440p гейминга.', 269.99, 'rx_6600_xt.jpg');

-- --------------------------------------------------------

--
-- Структура таблицы `hdds`
--

CREATE TABLE `hdds` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `capacity` int DEFAULT NULL,
  `speed` int DEFAULT NULL,
  `interface` varchar(50) DEFAULT NULL,
  `description` text,
  `price` decimal(10,2) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `hdds`
--

INSERT INTO `hdds` (`id`, `name`, `capacity`, `speed`, `interface`, `description`, `price`, `image`) VALUES
(1, 'Seagate Barracuda 1TB', 1000, 7200, 'SATA', 'Надежный жесткий диск для хранения данных.', 44.99, 'seagate_1tb.jpg'),
(2, 'WD Blue 2TB', 2000, 5400, 'SATA', 'Много места для файлов и проектов.', 59.99, 'wd_blue_2tb.jpg');

-- --------------------------------------------------------

--
-- Структура таблицы `motherboards`
--

CREATE TABLE `motherboards` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `brand` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `chipset` varchar(100) DEFAULT NULL,
  `socket` varchar(50) DEFAULT NULL,
  `form_factor` varchar(50) DEFAULT NULL,
  `memory_slots` int DEFAULT NULL,
  `max_memory` int DEFAULT NULL,
  `description` text,
  `price` decimal(10,2) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `motherboards`
--

INSERT INTO `motherboards` (`id`, `name`, `brand`, `chipset`, `socket`, `form_factor`, `memory_slots`, `max_memory`, `description`, `price`, `image`) VALUES
(1, 'MSI B660M PRO-VDH', 'AMD', 'B660', 'LGA1700', 'Micro-ATX', 4, 128, 'Поддержка процессоров Intel 12/13 Gen.', 99.99, 'msi_b660m.jpg'),
(2, 'ASUS TUF Gaming B550-PLUS', 'Intel', 'B550', 'AM4', 'ATX', 4, 128, 'Плата для Ryzen с поддержкой PCIe 4.0.', 129.99, 'asus_b550_plus.jpg');

-- --------------------------------------------------------

--
-- Структура таблицы `network_cards`
--

CREATE TABLE `network_cards` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `interface` varchar(50) DEFAULT NULL,
  `speed` varchar(50) DEFAULT NULL,
  `wireless` tinyint(1) DEFAULT NULL,
  `description` text,
  `price` decimal(10,2) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `network_cards`
--

INSERT INTO `network_cards` (`id`, `name`, `interface`, `speed`, `wireless`, `description`, `price`, `image`) VALUES
(1, 'TP-Link TG-3468', 'PCI-E', '1000Mbps', 0, 'Проводная гигабитная сетевая карта.', 12.99, 'tplink_tg3468.jpg'),
(2, 'ASUS PCE-AX58BT WiFi 6', 'PCI-E', '2400Mbps', 1, 'Быстрая Wi-Fi 6 карта с Bluetooth.', 49.99, 'asus_wifi6_card.jpg');

-- --------------------------------------------------------

--
-- Структура таблицы `psus`
--

CREATE TABLE `psus` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `power` int DEFAULT NULL,
  `certification` varchar(50) DEFAULT NULL,
  `modular` tinyint(1) DEFAULT NULL,
  `description` text,
  `price` decimal(10,2) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `psus`
--

INSERT INTO `psus` (`id`, `name`, `power`, `certification`, `modular`, `description`, `price`, `image`) VALUES
(1, 'Cooler Master MWE 650W 80+ Bronze', 650, '80+ Bronze', 0, 'Надежный БП для средней сборки.', 59.99, 'cm_mwe_650w.jpg'),
(2, 'Corsair RM750x 750W 80+ Gold', 750, '80+ Gold', 1, 'Модульный блок для мощных систем.', 109.99, 'corsair_rm750x.jpg');

-- --------------------------------------------------------

--
-- Структура таблицы `rams`
--

CREATE TABLE `rams` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `capacity` int DEFAULT NULL,
  `speed` int DEFAULT NULL,
  `type` varchar(50) DEFAULT NULL,
  `description` text,
  `price` decimal(10,2) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `rams`
--

INSERT INTO `rams` (`id`, `name`, `capacity`, `speed`, `type`, `description`, `price`, `image`) VALUES
(1, 'Kingston Fury Beast 16GB (2x8GB) DDR4 3200MHz', 16, 3200, 'DDR4', 'Надежная память с радиатором.', 54.99, 'kingston_16gb_ddr4.jpg'),
(2, 'Corsair Vengeance RGB 32GB (2x16GB) DDR5 5600MHz', 32, 5600, 'DDR5', 'Мощная память с RGB-подсветкой.', 124.99, 'corsair_32gb_ddr5.jpg');

-- --------------------------------------------------------

--
-- Структура таблицы `ssds`
--

CREATE TABLE `ssds` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `capacity` int DEFAULT NULL,
  `type` varchar(50) DEFAULT NULL,
  `interface` varchar(50) DEFAULT NULL,
  `description` text,
  `price` decimal(10,2) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `ssds`
--

INSERT INTO `ssds` (`id`, `name`, `capacity`, `type`, `interface`, `description`, `price`, `image`) VALUES
(1, 'Samsung 980 500GB NVMe M.2', 500, 'NVMe', 'M.2', 'Быстрый SSD от Samsung.', 59.99, 'samsung_980_500gb.jpg'),
(2, 'Kingston A400 240GB SATA', 240, 'SATA', '2.5\"', 'Бюджетный SSD для ОС.', 29.99, 'kingston_a400_240gb.jpg');

-- --------------------------------------------------------

--
-- Структура таблицы `ssds_extra`
--

CREATE TABLE `ssds_extra` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `capacity` int NOT NULL,
  `type` varchar(50) NOT NULL,
  `interface` varchar(50) NOT NULL,
  `description` text,
  `price` decimal(10,2) NOT NULL,
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `ssds_extra`
--

INSERT INTO `ssds_extra` (`id`, `name`, `capacity`, `type`, `interface`, `description`, `price`, `image`) VALUES
(101, 'Crucial MX500 1TB SATA', 1000, 'SATA', '2.5\"', 'Надежный SSD для повседневного использования.', 79.99, 'crucial_mx500_1tb.jpg'),
(102, 'WD Blue SN550 500GB NVMe M.2', 500, 'NVMe', 'M.2', 'Быстрый NVMe SSD от WD.', 64.99, 'wd_blue_sn550_500gb.jpg');

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `users_id` int NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `is_admin` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`users_id`, `email`, `phone`, `password`, `created_at`, `is_admin`) VALUES
(1, NULL, '88888888888', '$2y$10$iggor/DH4KEA8eNs0VLHneVty.8Lh9noDyTtrKuB6CQTPDMYxNYNK', '2025-07-18 23:41:53', 0),
(2, NULL, '77777777777', '$2y$10$ASOMPOxEE6qOa4bBuG0.N.lx7zHQDrexnXHpltCIsMWJ3RXdV9Dgi', '2025-07-18 23:42:31', 0),
(3, NULL, '88888888887', '$2y$10$Ff7vY1fSp52BeStnWx2tqOjEN2uR1FsYTtgCQgReoDg50N8wOewLu', '2025-07-19 13:12:39', 0),
(4, NULL, '77777777778', '$2y$10$Xq29NvTWj7pVDOp5m7cpae4j8e8xaSXygCn0mZ4gD2Qrqg12smyTS', '2025-07-19 13:21:45', 0),
(5, NULL, '55555555555', '$2y$10$/HtJvYFWbFtcyhTII1KyWOPvz7082OaqKQEFCMcBSa7H5.cQ0wx5O', '2025-07-19 15:32:26', 0),
(6, NULL, '44444444444', '$2y$10$C68jH6XAqCUsXzfc1EjrZOFfFJQn9WJ6r8XRU3Jg38THTfJ8zIFZO', '2025-07-19 16:51:25', 0),
(7, NULL, '99999999999', '$2y$10$bD4kNYrDTB/LO5I5srqOm.BTd3APsXs2TnZ8ma.LOoKozrvNTGZOu', '2025-07-26 00:55:23', 0),
(8, 'webrattafficra-3408@yopmail.com', NULL, '$2y$10$qKe4mebDc82TM0ykgFhsJOD4crCOSdn0k62ofOcVYrbu70LJo9Z7a', '2025-07-26 10:57:16', 1),
(9, NULL, '888888888888', '$2y$10$tHrfsPe/R0JUQBjOh2bL3.sz5M0yc2iLyPFXr.bF1Y/OKZVcZ4xta', '2025-07-26 14:37:38', 0);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `cases`
--
ALTER TABLE `cases`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `coolings`
--
ALTER TABLE `coolings`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `cpus`
--
ALTER TABLE `cpus`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `gpus`
--
ALTER TABLE `gpus`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `hdds`
--
ALTER TABLE `hdds`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `motherboards`
--
ALTER TABLE `motherboards`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `network_cards`
--
ALTER TABLE `network_cards`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `psus`
--
ALTER TABLE `psus`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `rams`
--
ALTER TABLE `rams`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `ssds`
--
ALTER TABLE `ssds`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `ssds_extra`
--
ALTER TABLE `ssds_extra`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`users_id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `phone` (`phone`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `cases`
--
ALTER TABLE `cases`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `coolings`
--
ALTER TABLE `coolings`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `cpus`
--
ALTER TABLE `cpus`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `gpus`
--
ALTER TABLE `gpus`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `hdds`
--
ALTER TABLE `hdds`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `motherboards`
--
ALTER TABLE `motherboards`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `network_cards`
--
ALTER TABLE `network_cards`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `psus`
--
ALTER TABLE `psus`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `rams`
--
ALTER TABLE `rams`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `ssds`
--
ALTER TABLE `ssds`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=103;

--
-- AUTO_INCREMENT для таблицы `ssds_extra`
--
ALTER TABLE `ssds_extra`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=103;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `users_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
