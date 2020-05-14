-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 12, 2020 at 08:24 AM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `raspi06`
--

-- --------------------------------------------------------

--
-- Table structure for table `ms01_temp`
--

CREATE TABLE `ms01_temp` (
  `idMS01_temp` int(100) NOT NULL,
  `MS` varchar(100) NOT NULL,
  `temp` varchar(100) NOT NULL,
  `date` varchar(100) DEFAULT NULL,
  `time` varchar(100) DEFAULT NULL,
  `status` enum('0','1') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ms01_temp`
--

INSERT INTO `ms01_temp` (`idMS01_temp`, `MS`, `temp`, `date`, `time`, `status`) VALUES
(1, 'MS01.temp', '32', '02-03-2020', '10:00', '1'),
(2, 'MS01.temp', '35', '02-03-2020', '10:04', '1'),
(3, 'MS01.temp', '33', '02-03-2020', '10:08', '1'),
(4, 'MS01.temp', '38', '02-03-2020', '10:11', '1'),
(5, 'MS01.temp', '33', '02-03-2020', '10:13', '1'),
(6, 'MS01.temp', '34', '02-03-2020', '10:15', '1'),
(7, 'MS01.temp', '36', '02-03-2020', '10:18', '1'),
(8, 'MS01.temp', '34', '02-03-2020', '10:22', '1'),
(9, 'MS01.temp', '33', '02-03-2020', '10:26', '1'),
(10, 'MS01.temp', '34', '02-03-2020', '10:29', '1');

-- --------------------------------------------------------

--
-- Table structure for table `ms02_ph`
--

CREATE TABLE `ms02_ph` (
  `idMS02_ph` int(100) NOT NULL,
  `MS` varchar(100) NOT NULL,
  `ph` varchar(100) NOT NULL,
  `date` varchar(100) DEFAULT NULL,
  `time` varchar(100) DEFAULT NULL,
  `status` enum('0','1') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ms02_ph`
--

INSERT INTO `ms02_ph` (`idMS02_ph`, `MS`, `ph`, `date`, `time`, `status`) VALUES
(1, 'MS02.ph', '4', '02-03-2020', '10:00', '1'),
(2, 'MS02.ph', '6', '02-03-2020', '10:04', '1'),
(3, 'MS02.ph', '5', '02-03-2020', '10:08', '1'),
(4, 'MS02.ph', '7', '02-03-2020', '10:11', '1'),
(5, 'MS02.ph', '9', '02-03-2020', '10:13', '1'),
(6, 'MS02.ph', '5', '02-03-2020', '10:15', '1'),
(7, 'MS02.ph', '7', '02-03-2020', '10:18', '1'),
(8, 'MS02.ph', '4', '02-03-2020', '10:22', '1'),
(9, 'MS02.ph', '5', '02-03-2020', '10:26', '1'),
(10, 'MS02.ph', '6', '02-03-2020', '10:29', '1');

-- --------------------------------------------------------

--
-- Table structure for table `ms03_amonia`
--

CREATE TABLE `ms03_amonia` (
  `idMS03_amonia` int(100) NOT NULL,
  `MS` varchar(100) NOT NULL,
  `amonia` varchar(100) NOT NULL,
  `date` varchar(100) DEFAULT NULL,
  `time` varchar(100) DEFAULT NULL,
  `status` enum('0','1') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ms03_amonia`
--

INSERT INTO `ms03_amonia` (`idMS03_amonia`, `MS`, `amonia`, `date`, `time`, `status`) VALUES
(1, 'MS03.amonia', '0.01', '02-03-2020', '10:00', '1'),
(2, 'MS03.amonia', '0.01', '02-03-2020', '10:04', '1'),
(3, 'MS03.amonia', '0.02', '02-03-2020', '10:08', '1'),
(4, 'MS03.amonia', '0.02', '02-03-2020', '10:11', '1'),
(5, 'MS03.amonia', '0.01', '02-03-2020', '10:13', '1'),
(6, 'MS03.amonia', '0.02', '02-03-2020', '10:15', '1'),
(7, 'MS03.amonia', '0.01', '02-03-2020', '10:18', '1'),
(8, 'MS03.amonia', '0.01', '02-03-2020', '10:22', '1'),
(9, 'MS03.amonia', '0.01', '02-03-2020', '10:26', '1'),
(10, 'MS03.amonia', '0.02', '02-03-2020', '10:29', '1');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ms01_temp`
--
ALTER TABLE `ms01_temp`
  ADD PRIMARY KEY (`idMS01_temp`);

--
-- Indexes for table `ms02_ph`
--
ALTER TABLE `ms02_ph`
  ADD PRIMARY KEY (`idMS02_ph`);

--
-- Indexes for table `ms03_amonia`
--
ALTER TABLE `ms03_amonia`
  ADD PRIMARY KEY (`idMS03_amonia`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ms01_temp`
--
ALTER TABLE `ms01_temp`
  MODIFY `idMS01_temp` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `ms02_ph`
--
ALTER TABLE `ms02_ph`
  MODIFY `idMS02_ph` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `ms03_amonia`
--
ALTER TABLE `ms03_amonia`
  MODIFY `idMS03_amonia` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
