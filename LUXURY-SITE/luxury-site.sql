-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 05, 2024 at 03:39 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

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

CREATE TABLE `brand` (
  `BrandID` int(11) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `Image` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `brand`
--

INSERT INTO `brand` (`BrandID`, `Name`, `Image`) VALUES
(1, 'Nike', '/Images/Nike.png'),
(2, 'addias', '/Images/Nike.png');

-- --------------------------------------------------------

--
-- Table structure for table `categoire`
--

CREATE TABLE `categoire` (
  `CategoireID` int(11) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `Image` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categoire`
--

INSERT INTO `categoire` (`CategoireID`, `Name`, `Image`) VALUES
(1, 'Bags', '/Images/2.png'),
(2, 'watch', '/Images/Nike.png');

-- --------------------------------------------------------

--
-- Table structure for table `orderdetails`
--

CREATE TABLE `orderdetails` (
  `OrderDetailsID` int(11) NOT NULL,
  `Quantity` int(11) NOT NULL,
  `Price` float NOT NULL,
  `OrderID` int(11) NOT NULL,
  `ProductID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `OrderID` int(11) NOT NULL,
  `OrderDate` varchar(50) NOT NULL,
  `Status` varchar(20) NOT NULL,
  `UserID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `prodcut_color`
--

CREATE TABLE `prodcut_color` (
  `Color_ID` int(11) NOT NULL,
  `Name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `prodcut_color`
--

INSERT INTO `prodcut_color` (`Color_ID`, `Name`) VALUES
(1, 'Red');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `ProductID` int(11) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `Description` varchar(200) NOT NULL,
  `Production Year` int(11) NOT NULL,
  `Bracelet Material` varchar(50) NOT NULL,
  `Price` float NOT NULL,
  `Quantity` int(11) NOT NULL,
  `Image` varchar(50) NOT NULL,
  `OfferPrice` float NOT NULL,
  `BrandID` int(11) NOT NULL,
  `CategoireID` int(11) NOT NULL,
  `Color_ID` int(11) NOT NULL,
  `SexID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`ProductID`, `Name`, `Description`, `Production Year`, `Bracelet Material`, `Price`, `Quantity`, `Image`, `OfferPrice`, `BrandID`, `CategoireID`, `Color_ID`, `SexID`) VALUES
(1, 'Bag1', 'A sophisticated taupe leather handbag with a textured finish', 2023, '', 100, 250, '/Images/bag1.jpg', 5, 1, 1, 1, 2),
(2, 'Bag2', 'An elegant taupe leather handbag with a textured surface.', 2022, '', 11240, 768, '/Images/bag2.jpg', 0, 2, 1, 1, 2),
(3, 'Bag3', 'A refined taupe handbag crafted from textured leather.', 2024, '', 564, 768, '/Images/bag3.jpg', 10, 2, 1, 1, 1),
(4, 'Bag5', 'A chic taupe leather bag featuring a textured design.', 2024, 'kjbakjdba', 714, 768, '/Images/2.png', 0, 2, 1, 1, 1),
(5, 'Bag4', 'A stylish handbag in taupe leather with a textured finish.', 2020, '', 2450, 768, '/Images/bag4.jpg', 50, 2, 1, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `RoleID` int(11) NOT NULL,
  `RoleName` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`RoleID`, `RoleName`) VALUES
(1, 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `sex`
--

CREATE TABLE `sex` (
  `SexID` int(11) NOT NULL,
  `Name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sex`
--

INSERT INTO `sex` (`SexID`, `Name`) VALUES
(1, 'Men'),
(2, 'Women'),
(3, 'dauhduiawhduia'),
(4, 'kids');

-- --------------------------------------------------------

--
-- Table structure for table `shippingaddresses`
--

CREATE TABLE `shippingaddresses` (
  `AddressID` int(11) NOT NULL,
  `FullName` varchar(50) NOT NULL,
  `AddressLine1` varchar(100) NOT NULL,
  `AddressLine2` varchar(100) DEFAULT NULL,
  `City` varchar(50) NOT NULL,
  `State` varchar(50) DEFAULT NULL,
  `PostalCode` varchar(20) DEFAULT NULL,
  `Country` varchar(50) NOT NULL,
  `PhoneNum` varchar(20) NOT NULL,
  `UserID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `UserID` int(11) NOT NULL,
  `UserName` varchar(50) NOT NULL,
  `Password` varchar(50) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `ProfileImage` varchar(50) NOT NULL,
  `RoleID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`UserID`, `UserName`, `Password`, `Email`, `ProfileImage`, `RoleID`) VALUES
(1, 'admin', 'admin', 'ahmed@gmail.cp,', 'daw', 1);

-- --------------------------------------------------------

--
-- Table structure for table `users_phonenum`
--

CREATE TABLE `users_phonenum` (
  `PhoneNumID` int(11) NOT NULL,
  `PhoneNum` varchar(50) NOT NULL,
  `UserID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `brand`
--
ALTER TABLE `brand`
  ADD PRIMARY KEY (`BrandID`);

--
-- Indexes for table `categoire`
--
ALTER TABLE `categoire`
  ADD PRIMARY KEY (`CategoireID`);

--
-- Indexes for table `orderdetails`
--
ALTER TABLE `orderdetails`
  ADD PRIMARY KEY (`OrderDetailsID`),
  ADD KEY `OrderID` (`OrderID`),
  ADD KEY `ProductID` (`ProductID`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`OrderID`),
  ADD KEY `UserID` (`UserID`);

--
-- Indexes for table `prodcut_color`
--
ALTER TABLE `prodcut_color`
  ADD PRIMARY KEY (`Color_ID`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`ProductID`),
  ADD KEY `BrandID` (`BrandID`),
  ADD KEY `CategoireID` (`CategoireID`),
  ADD KEY `Color_ID` (`Color_ID`),
  ADD KEY `Sex` (`SexID`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`RoleID`);

--
-- Indexes for table `sex`
--
ALTER TABLE `sex`
  ADD PRIMARY KEY (`SexID`);

--
-- Indexes for table `shippingaddresses`
--
ALTER TABLE `shippingaddresses`
  ADD PRIMARY KEY (`AddressID`),
  ADD KEY `UserID` (`UserID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`UserID`),
  ADD KEY `RoleID` (`RoleID`);

--
-- Indexes for table `users_phonenum`
--
ALTER TABLE `users_phonenum`
  ADD PRIMARY KEY (`PhoneNumID`),
  ADD KEY `UserID` (`UserID`);

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
