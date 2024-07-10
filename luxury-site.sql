-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jul 10, 2024 at 10:03 AM
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `brand`
--

INSERT INTO `brand` (`BrandID`, `Name`, `Image`) VALUES
(1, 'Nike', '/Images/Nike.png'),
(2, 'addias', '/Images/Nike.png'),
(6, '6tst', 'img'),
(8, '8tst', '/Images/c.png');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `categoire`
--

INSERT INTO `categoire` (`CategoireID`, `Name`, `Image`) VALUES
(1, 'Bags', '/Images/2.png'),
(2, 'watch', '/Images/Nike.png'),
(3, 'Shoes', '/Images/c.png'),
(4, '4tst', 'img'),
(7, '7tst', 'img'),
(8, '8tst', 'img'),
(9, '9tst', 'img'),
(10, '10tst', 'img'),
(11, '11tst', 'img'),
(12, '12tst', 'img'),
(13, '13tst', 'img'),
(14, '14tst', 'img'),
(15, '15tst', 'img'),
(16, '16tst', 'img'),
(17, '17tst', 'img'),
(18, '18tst', 'img'),
(19, '19tst', 'img'),
(20, '20tst', 'img'),
(21, '21tst', 'img'),
(22, '22tst', 'img'),
(23, '23tst', 'img'),
(24, '24tst', 'img'),
(25, '25tst', 'img'),
(26, '26tst', 'img'),
(27, '27tst', 'img'),
(28, '28tst', 'img'),
(29, '29tst', 'img'),
(30, '30tst', 'img'),
(31, '31tst', 'img'),
(32, '32tst', 'img'),
(33, '33tst', 'img'),
(34, '34tst', 'img'),
(35, '35tst', 'img'),
(36, '36tst', 'img'),
(37, '37tst', 'img'),
(38, '38tst', 'img'),
(39, '39tst', 'img'),
(40, '40tst', 'img'),
(41, '41tst', 'img'),
(42, '42tst', 'img'),
(43, '43tst', 'img'),
(44, '44tst', 'img'),
(45, '45tst', 'img'),
(46, '46tst', 'img'),
(47, '47tst', 'img'),
(48, '48tst', 'img'),
(49, '49tst', 'img'),
(50, '50tst', 'img'),
(51, '51tst', 'img'),
(52, '52tst', 'img'),
(53, '53tst', 'img'),
(54, '54tst', 'img'),
(55, '55tst', 'img'),
(56, '56tst', 'img'),
(57, '57tst', 'img'),
(58, '58tst', 'img'),
(59, '59tst', 'img'),
(60, '60tst', 'img'),
(61, '61tst', 'img'),
(62, '62tst', 'img'),
(63, '63tst', 'img'),
(64, '64tst', 'img'),
(65, '65tst', 'img'),
(66, '66tst', 'img'),
(67, '67tst', 'img'),
(68, '68tst', 'img'),
(69, '69tst', 'img'),
(70, '70tst', 'img'),
(71, '71tst', 'img'),
(72, '72tst', 'img'),
(73, '73tst', 'img'),
(74, '74tst', 'img'),
(75, '75tst', 'img'),
(76, '76tst', 'img'),
(77, '77tst', 'img'),
(78, '78tst', 'img'),
(79, '79tst', 'img'),
(80, '80tst', 'img'),
(81, '81tst', 'img'),
(82, '82tst', 'img'),
(83, '83tst', 'img'),
(84, '84tst', 'img'),
(85, '85tst', 'img'),
(86, '86tst', 'img'),
(87, '87tst', 'img'),
(88, '88tst', 'img'),
(89, '89tst', 'img'),
(90, '90tst', 'img'),
(91, '91tst', 'img'),
(92, '92tst', 'img'),
(93, '93tst', 'img'),
(94, '94tst', 'img'),
(95, '95tst', 'img'),
(96, '96tst', 'img'),
(97, '97tst', 'img'),
(98, '98tst', 'img'),
(99, '99tst', 'img'),
(100, '100tst', 'img'),
(101, '101tst', 'img'),
(102, '102tst', 'img'),
(103, '103tst', 'img'),
(104, '104tst', 'img'),
(105, '105tst', 'img'),
(106, '106tst', 'img'),
(107, '107tst', 'img'),
(108, '108tst', 'img'),
(109, '109tst', 'img'),
(110, '110tst', 'img'),
(111, '111tst', 'img'),
(112, '112tst', 'img'),
(113, '113tst', 'img'),
(114, '114tst', 'img'),
(115, '115tst', 'img'),
(116, '116tst', 'img'),
(117, '117tst', 'img'),
(118, '118tst', 'img'),
(119, '119tst', 'img'),
(120, '120tst', 'img'),
(121, '121tst', 'img'),
(122, '122tst', 'img'),
(123, '123tst', 'img'),
(124, '124tst', 'img'),
(125, '125tst', 'img'),
(126, '126tst', 'img'),
(127, '127tst', 'img'),
(128, '128tst', 'img'),
(129, '129tst', 'img'),
(130, '130tst', 'img'),
(131, '131tst', 'img'),
(132, '132tst', 'img'),
(133, '133tst', 'img'),
(134, '134tst', 'img'),
(135, '135tst', 'img'),
(136, '136tst', 'img'),
(137, '137tst', 'img'),
(138, '138tst', 'img'),
(139, '139tst', 'img'),
(140, '140tst', 'img'),
(141, '141tst', 'img'),
(142, '142tst', 'img'),
(143, '143tst', 'img'),
(144, '144tst', 'img'),
(145, '145tst', 'img'),
(146, '146tst', 'img'),
(147, '147tst', 'img'),
(148, '148tst', 'img'),
(149, '149tst', 'img'),
(150, '150tst', 'img'),
(151, '151tst', 'img'),
(152, '152tst', 'img'),
(153, '153tst', 'img'),
(154, '154tst', 'img'),
(155, '155tst', 'img'),
(156, '156tst', 'img'),
(157, '157tst', 'img'),
(158, '158tst', 'img'),
(159, '159tst', 'img'),
(160, '160tst', 'img'),
(161, '161tst', 'img'),
(162, '162tst', 'img'),
(163, '163tst', 'img'),
(164, '164tst', 'img'),
(165, '165tst', 'img'),
(166, '166tst', 'img'),
(167, '167tst', 'img'),
(168, '168tst', 'img'),
(169, '169tst', 'img'),
(170, '170tst', 'img'),
(171, '171tst', 'img'),
(172, '172tst', 'img'),
(173, '173tst', 'img'),
(174, '174tst', 'img'),
(175, '175tst', 'img'),
(176, '176tst', 'img'),
(177, '177tst', 'img'),
(178, '178tst', 'img'),
(179, '179tst', 'img'),
(180, '180tst', 'img'),
(181, '181tst', 'img'),
(182, '182tst', 'img'),
(183, '183tst', 'img'),
(184, '184tst', 'img'),
(185, '185tst', 'img'),
(186, '186tst', 'img'),
(187, '187tst', 'img'),
(188, '188tst', 'img'),
(189, '189tst', 'img'),
(190, '190tst', 'img'),
(191, '191tst', 'img'),
(192, '192tst', 'img'),
(193, '193tst', 'img'),
(194, '194tst', 'img'),
(195, '195tst', 'img'),
(196, '196tst', 'img'),
(197, '197tst', 'img'),
(198, '198tst', 'img'),
(199, '199tst', 'img'),
(200, '200tst', 'img'),
(201, '201tst', 'img'),
(202, '202tst', 'img'),
(204, 'ys', '/Images/c.png');

-- --------------------------------------------------------

--
-- Table structure for table `orderdetails`
--

DROP TABLE IF EXISTS `orderdetails`;
CREATE TABLE IF NOT EXISTS `orderdetails` (
  `OrderDetailsID` int(11) NOT NULL,
  `Quantity` int(11) NOT NULL,
  `Price` float NOT NULL,
  `OrderID` int(11) NOT NULL,
  `ProductID` int(11) NOT NULL,
  PRIMARY KEY (`OrderDetailsID`),
  KEY `OrderID` (`OrderID`),
  KEY `ProductID` (`ProductID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
  PRIMARY KEY (`OrderID`),
  KEY `UserID` (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `prodcut_color`
--

DROP TABLE IF EXISTS `prodcut_color`;
CREATE TABLE IF NOT EXISTS `prodcut_color` (
  `Color_ID` int(11) NOT NULL,
  `Name` varchar(50) NOT NULL,
  PRIMARY KEY (`Color_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `prodcut_color`
--

INSERT INTO `prodcut_color` (`Color_ID`, `Name`) VALUES
(1, 'Red');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
CREATE TABLE IF NOT EXISTS `products` (
  `ProductID` int(11) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `Description` varchar(200) NOT NULL,
  `ProductionYear` int(11) NOT NULL,
  `BraceletMaterial` varchar(50) NOT NULL,
  `Price` float NOT NULL,
  `Quantity` int(11) NOT NULL,
  `Image` varchar(50) NOT NULL,
  `OfferPrice` float NOT NULL,
  `BrandID` int(11) NOT NULL,
  `CategoireID` int(11) NOT NULL,
  `Color_ID` int(11) NOT NULL,
  `SexID` int(11) NOT NULL,
  PRIMARY KEY (`ProductID`),
  KEY `BrandID` (`BrandID`),
  KEY `CategoireID` (`CategoireID`),
  KEY `Color_ID` (`Color_ID`),
  KEY `Sex` (`SexID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`ProductID`, `Name`, `Description`, `ProductionYear`, `BraceletMaterial`, `Price`, `Quantity`, `Image`, `OfferPrice`, `BrandID`, `CategoireID`, `Color_ID`, `SexID`) VALUES
(1, 'Bag1', 'A sophisticated taupe leather handbag with a textured finish', 2023, '', 100, 250, '/Images/bag1.jpg', 5, 1, 1, 1, 2),
(2, 'Bag2', 'An elegant taupe leather handbag with a textured surface.', 2022, '', 11240, 768, '/Images/bag2.jpg', 0, 2, 1, 1, 2),
(3, 'Bag3', 'A refined taupe handbag crafted from textured leather.', 2024, '', 564, 768, '/Images/bag3.jpg', 10, 2, 1, 1, 1),
(4, 'Bag5', 'A chic taupe leather bag featuring a textured design.', 2024, 'kjbakjdba', 714, 768, '/Images/2.png', 0, 2, 1, 1, 1),
(5, 'Bag4', 'A stylish handbag in taupe leather with a textured finish.', 2020, '', 2450, 768, '/Images/bag4.jpg', 50, 2, 1, 1, 1),
(6, '6tstef', 'no', 2002, '', 0, 1, '/Images/c.png', 0, 1, 1, 1, 2),
(10, 'ttt', 'w', 2022, 'metalic', 100, 1, '/Images/c.png', 0, 1, 18, 1, 2),
(11, 'ys', 'wdq', 2022, 'ed', 21, 32, '/Images/c.png', 122, 1, 19, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
CREATE TABLE IF NOT EXISTS `roles` (
  `RoleID` int(11) NOT NULL,
  `RoleName` varchar(50) NOT NULL,
  PRIMARY KEY (`RoleID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`RoleID`, `RoleName`) VALUES
(1, 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `sex`
--

DROP TABLE IF EXISTS `sex`;
CREATE TABLE IF NOT EXISTS `sex` (
  `SexID` int(11) NOT NULL,
  `Name` varchar(50) NOT NULL,
  PRIMARY KEY (`SexID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sex`
--

INSERT INTO `sex` (`SexID`, `Name`) VALUES
(1, 'Men'),
(2, 'Women'),
(3, 'dauhduiawhduia'),
(4, 'kids'),
(7, 'dadfaw');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `UserID` int(11) NOT NULL,
  `UserName` varchar(50) NOT NULL,
  `Password` varchar(50) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `ProfileImage` varchar(50) NOT NULL,
  `RoleID` int(11) NOT NULL,
  PRIMARY KEY (`UserID`),
  KEY `RoleID` (`RoleID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`UserID`, `UserName`, `Password`, `Email`, `ProfileImage`, `RoleID`) VALUES
(1, 'admin', 'admin', 'ahmed@gmail.cp,', 'daw', 1);

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `orderdetails`
--
ALTER TABLE `orderdetails`
  ADD CONSTRAINT `orderdetails_ibfk_1` FOREIGN KEY (`OrderID`) REFERENCES `orders` (`OrderID`),
  ADD CONSTRAINT `orderdetails_ibfk_2` FOREIGN KEY (`ProductID`) REFERENCES `products` (`ProductID`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `users` (`UserID`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `Sex` FOREIGN KEY (`SexID`) REFERENCES `sex` (`SexID`),
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`BrandID`) REFERENCES `brand` (`BrandID`),
  ADD CONSTRAINT `products_ibfk_2` FOREIGN KEY (`CategoireID`) REFERENCES `categoire` (`CategoireID`),
  ADD CONSTRAINT `products_ibfk_3` FOREIGN KEY (`Color_ID`) REFERENCES `prodcut_color` (`Color_ID`);

--
-- Constraints for table `shippingaddresses`
--
ALTER TABLE `shippingaddresses`
  ADD CONSTRAINT `shippingaddresses_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `users` (`UserID`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`RoleID`) REFERENCES `roles` (`RoleID`);

--
-- Constraints for table `users_phonenum`
--
ALTER TABLE `users_phonenum`
  ADD CONSTRAINT `users_phonenum_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `users` (`UserID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
