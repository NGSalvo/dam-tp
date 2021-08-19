-- MySQL dump 10.13  Distrib 8.0.25, for Win64 (x86_64)
--
-- Host: localhost    Database: dam_fiuba
-- ------------------------------------------------------
-- Server version	8.0.25



SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES latin1 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE DATABASE IF NOT EXISTS `dam_fiuba` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `dam_fiuba`;

--
-- Table structure for table `device`
--

CREATE TABLE `device` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(200) DEFAULT NULL,
  `location` varchar(200) DEFAULT NULL,
  `solenoid_valve_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `solenoid_valve_id` (`solenoid_valve_id`),
  CONSTRAINT `device_ibfk_1` FOREIGN KEY (`solenoid_valve_id`) REFERENCES `solenoid_valve` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `device`
--


INSERT INTO `device` (`id`, `name`, `location`, `solenoid_valve_id`) VALUES
(1,'Sensor 1','Patio',1),
(2,'Sensor 2','Cocina',2),
(3,'Sensor 3','Jardin Delantero',3),
(4,'Sensor 4','Living',4),
(5,'Sensor 5','Habitacion 1',5),
(6,'Sensor 6','Habitacion 2',6);

--
-- Table structure for table `irrigation_log`
--

CREATE TABLE `irrigation_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `opened` tinyint DEFAULT NULL,
  `date_of_log` datetime DEFAULT CURRENT_TIMESTAMP,
  `solenoid_valve_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `solenoid_valve_id` (`solenoid_valve_id`),
  CONSTRAINT `irrigation_log_ibfk_1` FOREIGN KEY (`solenoid_valve_id`) REFERENCES `solenoid_valve` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


--
-- Dumping data for table `irrigation_log`
--


--
-- Table structure for table `measurement`
--

CREATE TABLE `measurement` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date_of_measurement` datetime DEFAULT CURRENT_TIMESTAMP,
  `value` varchar(100) DEFAULT NULL,
  `device_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `device_id` (`device_id`),
  CONSTRAINT `measurement_ibfk_1` FOREIGN KEY (`device_id`) REFERENCES `device` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `measurement`
--

INSERT INTO `measurement` (`id`, `date_of_measurement`, `value`, `device_id`) VALUES
(1,'2021-08-02 11:30:59','60',1),
(2,'2021-08-02 11:31:41','40',1),
(3,'2021-08-02 11:31:44','30',2),
(4,'2021-08-02 11:32:13','50',3),
(5,'2021-08-02 11:33:02','33',5),
(6,'2021-08-02 11:34:23','17',4),
(7,'2021-08-02 11:34:25','29',6),
(8,'2021-08-02 11:34:27','20',1),
(9,'2021-08-02 11:35:40','44',4),
(10,'2021-08-02 11:36:03','61',5),
(11,'2021-08-02 11:36:05','12',2);

--
-- Table structure for table `solenoid_valve`
--

CREATE TABLE `solenoid_valve` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `solenoid_valve`
--

INSERT INTO `solenoid_valve` (`id`, `name`) VALUES
(1,'elPatio'),
(2,'eLCocina'),
(3,'eLJardinDelantero'),
(4,'eLLiving'),
(5,'eLHabitacion1'),
(6,'eLHabitacion2');

COMMIT;
--
-- Dumping routines for database 'dam_fiuba'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-08-13 14:32:18
