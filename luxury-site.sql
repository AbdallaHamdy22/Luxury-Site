-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jul 17, 2024 at 06:52 PM
-- Server version: 5.7.36
-- PHP Version: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `luxury-site`
--

-- --------------------------------------------------------

--
-- Table structure for table `brand`
--

DROP TABLE IF EXISTS `brand`;
CREATE TABLE IF NOT EXISTS `brand` (
  `BrandID` int(11) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `Image` varchar(50) NOT NULL,
  PRIMARY KEY (`BrandID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `brand`
--

INSERT INTO `brand` (`BrandID`, `Name`, `Image`) VALUES
(1, 'Gucci', '/Images/gucci.png');

-- --------------------------------------------------------

--
-- Table structure for table `categoire`
--

DROP TABLE IF EXISTS `categoire`;
CREATE TABLE IF NOT EXISTS `categoire` (
  `CategoireID` int(11) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `Image` varchar(50) NOT NULL,
  PRIMARY KEY (`CategoireID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `categoire`
--

INSERT INTO `categoire` (`CategoireID`, `Name`, `Image`) VALUES
(1, 'Bags', '/Images/2.png');

-- --------------------------------------------------------

--
-- Table structure for table `orderdetails`
--

DROP TABLE IF EXISTS `orderdetails`;
CREATE TABLE IF NOT EXISTS `orderdetails` (
  `OrderDetailsID` int(11) NOT NULL AUTO_INCREMENT,
  `Quantity` int(11) NOT NULL,
  `Price` float NOT NULL,
  `OrderID` int(11) NOT NULL,
  `ProductID` int(11) NOT NULL,
  PRIMARY KEY (`OrderDetailsID`),
  KEY `OrderID` (`OrderID`),
  KEY `ProductID` (`ProductID`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `orderdetails`
--

INSERT INTO `orderdetails` (`OrderDetailsID`, `Quantity`, `Price`, `OrderID`, `ProductID`) VALUES
(2, 2, 100, 1, 1),
(3, 2, 100, 2, 1),
(4, 2, 100, 3, 1),
(5, 2, 100, 4, 1),
(6, 2, 100, 5, 1);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
CREATE TABLE IF NOT EXISTS `orders` (
  `OrderID` int(11) NOT NULL,
  `OrderDate` varchar(50) NOT NULL,
  `Status` varchar(20) NOT NULL,
  `UserID` int(11) NOT NULL,
  `PaymentID` int(11) NOT NULL,
  PRIMARY KEY (`OrderID`),
  KEY `UserID` (`UserID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`OrderID`, `OrderDate`, `Status`, `UserID`, `PaymentID`) VALUES
(3, '2024-07-12 08:04:03', 'pending', 2, 2116516),
(2, '2024-07-12 08:04:03', 'pending', 2, 2116516),
(1, '2024-07-12 08:04:02', 'pending', 2, 2116516),
(4, '2024-07-12 08:04:03', 'pending', 2, 2116516),
(5, '2024-07-12 08:04:04', 'pending', 2, 2116516);

-- --------------------------------------------------------

--
-- Table structure for table `prodcut_color`
--

DROP TABLE IF EXISTS `prodcut_color`;
CREATE TABLE IF NOT EXISTS `prodcut_color` (
  `Color_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) NOT NULL,
  PRIMARY KEY (`Color_ID`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `prodcut_color`
--

INSERT INTO `prodcut_color` (`Color_ID`, `Name`) VALUES
(1, 'Red'),
(2, 'blue');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
CREATE TABLE IF NOT EXISTS `products` (
  `ProductID` int(11) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `Description` varchar(200) NOT NULL,
  `Price` float NOT NULL,
  `UserPrice` float NOT NULL,
  `Quantity` float NOT NULL,
  `BraceletMaterial` varchar(50) NOT NULL,
  `OfferPrice` float NOT NULL,
  `ProductionYear` varchar(50) NOT NULL,
  `Image` varchar(50) NOT NULL,
  `BrandID` int(11) NOT NULL,
  `CategoireID` int(11) NOT NULL,
  `Color_ID` int(11) NOT NULL,
  `SexID` int(11) NOT NULL,
  PRIMARY KEY (`ProductID`),
  KEY `BrandID` (`BrandID`),
  KEY `CategoireID` (`CategoireID`),
  KEY `Color_ID` (`Color_ID`),
  KEY `SexID` (`SexID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`ProductID`, `Name`, `Description`, `Price`, `UserPrice`, `Quantity`, `BraceletMaterial`, `OfferPrice`, `ProductionYear`, `Image`, `BrandID`, `CategoireID`, `Color_ID`, `SexID`) VALUES
(1, 'hew', 'jkn', 564, 0, 1, '', 0, '0', '', 1, 1, 1, 1),
(2, 'pro1', 'mewo', 100, 0, 5, '', 0, '0', '/Images/bag4.jpg', 1, 1, 1, 1),
(3, 'pro1w', 'efaf', 10050, 10010, 148, '', 0, '0', 'img', 1, 1, 1, 1),
(4, 'kmfkwlamnf', 'ejkfnkwjnfjkwnfnk', 28, 15, 15, '', 0, '0', '/Images/bag3.jpg', 1, 1, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `queuedetails`
--

DROP TABLE IF EXISTS `queuedetails`;
CREATE TABLE IF NOT EXISTS `queuedetails` (
  `ProductName` varchar(50) NOT NULL,
  `productDescription` varchar(50) NOT NULL,
  `ProductPrice` float NOT NULL,
  `Quantity` float NOT NULL,
  `Image` varchar(50) NOT NULL,
  `CategoireID` int(11) NOT NULL,
  `BrandID` int(11) NOT NULL,
  `SexID` int(11) NOT NULL,
  `Color_ID` int(11) NOT NULL,
  `QueueID` int(11) NOT NULL,
  KEY `CategoireID` (`CategoireID`),
  KEY `BrandID` (`BrandID`),
  KEY `SexID` (`SexID`),
  KEY `Color_ID` (`Color_ID`),
  KEY `QueueID` (`QueueID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `queuelist`
--

DROP TABLE IF EXISTS `queuelist`;
CREATE TABLE IF NOT EXISTS `queuelist` (
  `QueueID` int(11) NOT NULL,
  `UserID` int(11) NOT NULL,
  PRIMARY KEY (`QueueID`),
  KEY `UserID` (`UserID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
CREATE TABLE IF NOT EXISTS `roles` (
  `RoleID` int(11) NOT NULL,
  `RoleName` varchar(50) NOT NULL,
  PRIMARY KEY (`RoleID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`RoleID`, `RoleName`) VALUES
(1, 'admin'),
(2, 'customer');

-- --------------------------------------------------------

--
-- Table structure for table `sex`
--

DROP TABLE IF EXISTS `sex`;
CREATE TABLE IF NOT EXISTS `sex` (
  `SexID` int(11) NOT NULL,
  `Name` varchar(50) NOT NULL,
  PRIMARY KEY (`SexID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `sex`
--

INSERT INTO `sex` (`SexID`, `Name`) VALUES
(1, 'Men');

-- --------------------------------------------------------

--
-- Table structure for table `shippingaddresses`
--

DROP TABLE IF EXISTS `shippingaddresses`;
CREATE TABLE IF NOT EXISTS `shippingaddresses` (
  `AddressID` int(11) NOT NULL,
  `FullName` varchar(50) NOT NULL,
  `AddressLine1` varchar(100) NOT NULL,
  `AddressLine2` varchar(100) DEFAULT NULL,
  `City` varchar(50) NOT NULL,
  `State` varchar(50) DEFAULT NULL,
  `PostalCode` varchar(20) DEFAULT NULL,
  `Country` varchar(50) NOT NULL,
  `PhoneNum` varchar(20) NOT NULL,
  `UserID` int(11) NOT NULL,
  PRIMARY KEY (`AddressID`),
  KEY `UserID` (`UserID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `UserID` int(11) NOT NULL AUTO_INCREMENT,
  `UserName` varchar(50) NOT NULL,
  `Password` varchar(50) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `ProfileImage` varchar(50) NOT NULL,
  `RoleID` int(11) NOT NULL,
  PRIMARY KEY (`UserID`),
  KEY `RoleID` (`RoleID`)
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`UserID`, `UserName`, `Password`, `Email`, `ProfileImage`, `RoleID`) VALUES
(2, 'ahmed', 'ahmed', 'ahmed@gmail.com', 't', 2),
(1, 'admin', 'admin', 'admin@admin.com', 'admin', 1),
(15, 'customer cus', 'ahmed', 'hier@amed.com', '', 2);

-- --------------------------------------------------------

--
-- Table structure for table `users_phonenum`
--

DROP TABLE IF EXISTS `users_phonenum`;
CREATE TABLE IF NOT EXISTS `users_phonenum` (
  `PhoneNumID` int(11) NOT NULL,
  `PhoneNum` varchar(50) NOT NULL,
  `UserID` int(11) NOT NULL,
  PRIMARY KEY (`PhoneNumID`),
  KEY `UserID` (`UserID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
