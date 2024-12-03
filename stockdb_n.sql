/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE TABLE `clients` (
  `rfc` varchar(13) NOT NULL,
  `first_name` varchar(30) DEFAULT NULL,
  `last_name` varchar(30) DEFAULT NULL,
  `birth_date` date DEFAULT NULL,
  `gender` enum('M','F') DEFAULT NULL,
  `phone_number` varchar(10) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `address` text NOT NULL DEFAULT '1',
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`rfc`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `stock` float DEFAULT NULL,
  `measurement_unit` enum('piece','meters','liters','square meters','cubic meters') DEFAULT NULL,
  `price` decimal(5,2) DEFAULT NULL,
  `discount` decimal(5,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

CREATE TABLE `products_suppliers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `supplier_rfc` varchar(13) NOT NULL,
  `notes` text DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  KEY `supplier_rfc` (`supplier_rfc`),
  CONSTRAINT `products_suppliers_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  CONSTRAINT `products_suppliers_ibfk_2` FOREIGN KEY (`supplier_rfc`) REFERENCES `suppliers` (`rfc`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

CREATE TABLE `purchases` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `products_suppliers_id` int(11) DEFAULT NULL,
  `quantity` decimal(8,2) DEFAULT NULL,
  `purchase_date` timestamp NULL DEFAULT current_timestamp(),
  `payment_method` enum('cash','credit','debit','mix') DEFAULT NULL,
  `ticket` varchar(255) DEFAULT NULL,
  `invoice` varchar(255) DEFAULT NULL,
  `price` decimal(5,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `products_suppliers_id` (`products_suppliers_id`),
  CONSTRAINT `purchases_ibfk_1` FOREIGN KEY (`products_suppliers_id`) REFERENCES `products_suppliers` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

CREATE TABLE `sales` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `client_rfc` varchar(13) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `quantity` decimal(8,2) DEFAULT NULL,
  `sale_date` timestamp NULL DEFAULT current_timestamp(),
  `payment_method` enum('cash','credit','debit','mix') DEFAULT NULL,
  `ticket` varchar(255) DEFAULT NULL,
  `invoice` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `client_rfc` (`client_rfc`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `sales_ibfk_1` FOREIGN KEY (`client_rfc`) REFERENCES `clients` (`rfc`),
  CONSTRAINT `sales_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

CREATE TABLE `staff` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(30) DEFAULT NULL,
  `last_name` varchar(30) DEFAULT NULL,
  `birth_date` date DEFAULT NULL,
  `gender` enum('M','F') DEFAULT NULL,
  `phone_number` varchar(10) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `address` text NOT NULL DEFAULT '1',
  `is_active` tinyint(1) DEFAULT 1,
  `user_id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `staff_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

CREATE TABLE `suppliers` (
  `rfc` varchar(13) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `phone_number` varchar(10) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `address` text NOT NULL DEFAULT '1',
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`rfc`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(30) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;



INSERT INTO `products` (`id`, `product`, `description`, `stock`, `measurement_unit`, `price`, `discount`) VALUES
(1, 'Canela', 'alimento', 2, 'piece', '2.00', '4.00');
INSERT INTO `products` (`id`, `product`, `description`, `stock`, `measurement_unit`, `price`, `discount`) VALUES
(2, 'Bicicleta', 'Bicicleta de montaña', 50, 'piece', '100.00', '10.00');
INSERT INTO `products` (`id`, `product`, `description`, `stock`, `measurement_unit`, `price`, `discount`) VALUES
(3, 'Bicicleta', 'Bicicleta de montaña', 0, 'piece', '1.00', '10.00');
INSERT INTO `products` (`id`, `product`, `description`, `stock`, `measurement_unit`, `price`, `discount`) VALUES
(4, 'Bicicleta', 'Bicicleta de montaña', 5, 'piece', '100.00', '10.00'),
(5, 'Bicicleta', 'Bicicleta de montaña', 5, 'piece', '100.00', '10.00'),
(6, 'Motocicleta', 'Todo Terreno', 50, 'piece', '100.00', '10.00');

INSERT INTO `products_suppliers` (`id`, `product_id`, `supplier_rfc`, `notes`) VALUES
(1, 6, '13567890', 'Updated product-supplier association');
INSERT INTO `products_suppliers` (`id`, `product_id`, `supplier_rfc`, `notes`) VALUES
(2, 1, '13567890', 'nuevo');
INSERT INTO `products_suppliers` (`id`, `product_id`, `supplier_rfc`, `notes`) VALUES
(3, 6, '123456', 'prueba2');
INSERT INTO `products_suppliers` (`id`, `product_id`, `supplier_rfc`, `notes`) VALUES
(4, 5, '123456', 'prueba2');





INSERT INTO `staff` (`id`, `first_name`, `last_name`, `birth_date`, `gender`, `phone_number`, `email`, `address`, `is_active`, `user_id`, `created_at`, `updated_at`) VALUES
(1, 'Ana', 'Karen', '2003-01-19', 'M', '2870000000', 'akbaltazar72@gmail.com', 'conocida', 1, 1, '2024-11-12 15:21:58', '2024-11-12 15:21:58');
INSERT INTO `staff` (`id`, `first_name`, `last_name`, `birth_date`, `gender`, `phone_number`, `email`, `address`, `is_active`, `user_id`, `created_at`, `updated_at`) VALUES
(2, 'John', 'Doe', '1990-01-01', 'M', '5551234', 'johndoe@example.com', '123 Main St', 1, 1, '2024-11-12 15:33:36', '2024-11-12 15:33:36');
INSERT INTO `staff` (`id`, `first_name`, `last_name`, `birth_date`, `gender`, `phone_number`, `email`, `address`, `is_active`, `user_id`, `created_at`, `updated_at`) VALUES
(3, 'John', 'Doe', '1990-01-01', 'M', '5551234', 'johndoe2@example.com', '123 Main St', 1, 1, '2024-11-12 15:34:54', '2024-11-12 15:34:54');

INSERT INTO `suppliers` (`rfc`, `name`, `description`, `phone_number`, `email`, `address`, `is_active`, `created_at`, `updated_at`) VALUES
('123456', 'Alexis', 'Delgado', '1234544451', 'alexis.15@gamil.com', 'casa verde', 1, '2024-11-27 04:45:09', '2024-11-27 04:45:09');
INSERT INTO `suppliers` (`rfc`, `name`, `description`, `phone_number`, `email`, `address`, `is_active`, `created_at`, `updated_at`) VALUES
('13567890', 'Karen', 'chica', '1234567889', 'karen@gmail.com', '123456', 1, '2024-11-27 04:34:59', '2024-11-27 04:34:59');


INSERT INTO `users` (`id`, `username`, `password`, `email`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'Ana.bc', 'A1234', 'a.p@gmail.com', 1, '2024-11-05 17:30:43', '2024-11-05 17:32:28');
INSERT INTO `users` (`id`, `username`, `password`, `email`, `is_active`, `created_at`, `updated_at`) VALUES
(2, 'Karen.bc', 'K1234', 'k.a@gmail.com', 1, '2024-11-05 17:31:19', '2024-11-05 17:32:28');
INSERT INTO `users` (`id`, `username`, `password`, `email`, `is_active`, `created_at`, `updated_at`) VALUES
(3, 'Juan.cc', 'j1234', 'j.u@gmail.com', 1, '2024-11-05 17:31:54', '2024-11-05 17:32:28');
INSERT INTO `users` (`id`, `username`, `password`, `email`, `is_active`, `created_at`, `updated_at`) VALUES
(4, 'Robin', 'batmobile', 'batman@batmobile.com', 1, '2024-11-07 17:50:56', '2024-11-07 22:55:48'),
(5, 'Ana', 'batmobile', 'batman@batmobile.com', 0, '2024-11-07 23:19:13', '2024-11-08 17:28:21'),
(6, 'batman', 'batmobile', 'batman@batmobile.com', 1, '2024-11-11 15:47:43', '2024-11-11 15:47:43'),
(7, 'Ironman', '$2b$10$yKCDKat0r5DzZQD2.53vF.5NOdHQ9edRtb3OfYgc7z.kCxjaEMqcm', 'ironman@avengers.com', 1, '2024-11-14 17:30:24', '2024-11-14 17:30:24');


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;