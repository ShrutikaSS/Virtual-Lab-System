-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 24, 2026 at 09:58 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `virtual_lab`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `username` varchar(50) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('student','faculty','admin') NOT NULL DEFAULT 'student',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `full_name`, `username`, `email`, `password`, `role`, `created_at`) VALUES
(1, 'Sujal Shirsath', '125UAM1166', 'shirsathsujal2@gmail.com', '$2y$10$mu0snGPMXSdtiFOw7YREWuDIuY6fLEsCw8Q3Y/m7rUOwf0YCZZPJK', 'student', '2026-07-21 05:47:50'),
(2, 'atharv shinde', 'atharv', 'atharvshinde1008@gmail.com', '$2y$10$En41PCLEpZj488fWy4WALektrNuG.IIF5ScseKQjMSaWjOZ6rz5iK', 'student', '2026-07-21 06:31:49'),
(3, 'Shrutika Soudagar', 'shrutika', 'shrutika@gmail.com', '$2y$10$VcBPig5Bc2SVsVJ6etp2uOTDOhuia.fTiD4SZ9l8.tUGLzlXFzNXa', 'faculty', '2026-07-21 08:33:48'),
(7, 'atharv shinde', 'pratik', 'atharv1008@gmail.com', '$2y$10$ZBWroIP.DS9wNauuy1sOCervv6MljC5dQTC84H290nbjlOQYFYrgK', 'student', '2026-07-22 04:56:58'),
(9, 'Dipali Shende', 'Shende', 'dipalishende@gmail.com', '$2y$10$H/6irKghGg6b/weR08JrDeMwaqyNqSbqCjrD9VFULUmi2.DhMzmnu', 'faculty', '2026-07-22 05:57:53'),
(10, 'Sujal Shirsath', 'sujal', 'sujal12@gmail.com', '$2y$10$Pj.FMynlpdUU7G/DPRUdqusHTPbUbPezkvt087jHFp7H3Xuvb0ULq', 'faculty', '2026-07-22 09:12:47'),
(11, 'Atharva Shinde', 'Superadmin69', 'atharv99@gmail.com', '$2y$10$xgK8WPipL25yypoq9KCoo.g68diytcvXgWWxALs2UwWYEylo.BtkG', 'admin', '2026-07-23 08:42:37');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
