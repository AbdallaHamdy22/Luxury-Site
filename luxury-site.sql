-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 07, 2024 at 06:52 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

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
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `brand`
--

INSERT INTO `brand` (`BrandID`, `Name`, `Image`) VALUES
(1, 'Gucci', '/Images/5.png'),
(2, 'Dior', '/Images/bag2.jpg'),
(3, 'Nike', '/Images/Nike.png');

-- --------------------------------------------------------

--
-- Table structure for table `categoire`
--

CREATE TABLE `categoire` (
  `CategoireID` int(11) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `Image` varchar(50) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `categoire`
--

INSERT INTO `categoire` (`CategoireID`, `Name`, `Image`) VALUES
(1, 'Bags', '/Images/2.png'),
(2, 'Watches', '/Images/bag2.jpg'),
(3, 'Shoes', '/Images/3.png');

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
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `OrderID` int(11) NOT NULL,
  `OrderDate` varchar(50) NOT NULL,
  `Status` varchar(20) NOT NULL,
  `UserID` int(11) NOT NULL,
  `PaymentID` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `prodcut_color`
--

CREATE TABLE `prodcut_color` (
  `Color_ID` int(11) NOT NULL,
  `Name` varchar(50) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `prodcut_color`
--

INSERT INTO `prodcut_color` (`Color_ID`, `Name`) VALUES
(1, 'Red'),
(2, 'blue'),
(5, 'Green'),
(6, 'Black');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `ProductID` int(11) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `Description` varchar(200) NOT NULL,
  `Price` float NOT NULL,
  `UserPrice` float NOT NULL,
  `Quantity` float NOT NULL,
  `MainQuantity` int(11) NOT NULL,
  `OfferPrice` float DEFAULT NULL,
  `ProductionYear` varchar(50) NOT NULL,
  `Image` varchar(50) NOT NULL,
  `BrandID` int(11) NOT NULL,
  `CategoireID` int(11) NOT NULL,
  `Color_ID` int(11) NOT NULL,
  `SexID` int(11) NOT NULL,
  `UserID` int(11) NOT NULL,
  `Status` varchar(100) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`ProductID`, `Name`, `Description`, `Price`, `UserPrice`, `Quantity`, `MainQuantity`, `OfferPrice`, `ProductionYear`, `Image`, `BrandID`, `CategoireID`, `Color_ID`, `SexID`, `UserID`, `Status`) VALUES
(3, 'Emerald', 'adwjk', 9, 1, 10, 10, 0, '0', '/Images/66ad132ad64ce.jpg', 1, 1, 1, 1, 1, 'Available'),
(4, 'Abdalla Hamdy', 'ajkfaejfbauiefbufb ajkfaejfbauiefbufbajkfaejfbauie', 1350, 10, 11, 11, 0, '0', '/Images/66afa0d77af09.jpg,/Images/66afa0d77b24b.jp', 1, 1, 1, 1, 1, 'Available'),
(2, '1', '1', 1, 1, 11, 11, 1, '0', '/Images/66ad124485b88.jpg', 1, 1, 1, 1, 1, 'OnSale'),
(1, 'Abdalla Hamdy', 'Great product', 160, 100, 11, 11, 0, '0', '/Images/66ad11b56593b.jpg,/Images/66ad11b565c55.pn', 1, 1, 1, 1, 1, 'Available');

-- --------------------------------------------------------

--
-- Table structure for table `queuedetails`
--

CREATE TABLE `queuedetails` (
  `id` int(11) NOT NULL,
  `ProductName` varchar(50) NOT NULL,
  `productDescription` varchar(50) NOT NULL,
  `ProductPrice` float NOT NULL,
  `OfferPrice` float DEFAULT NULL,
  `Quantity` float NOT NULL,
  `MainQuantity` int(11) NOT NULL,
  `Image` varchar(10000) NOT NULL,
  `CategoireID` int(11) NOT NULL,
  `BrandID` int(11) NOT NULL,
  `SexID` int(11) NOT NULL,
  `Color_ID` int(11) NOT NULL,
  `QueueID` int(11) NOT NULL,
  `UserID` int(11) DEFAULT NULL,
  `Status` varchar(100) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `queuelist`
--

CREATE TABLE `queuelist` (
  `QueueID` int(11) NOT NULL,
  `UserID` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `RoleID` int(11) NOT NULL,
  `RoleName` varchar(50) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

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

CREATE TABLE `sex` (
  `SexID` int(11) NOT NULL,
  `Name` varchar(50) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `sex`
--

INSERT INTO `sex` (`SexID`, `Name`) VALUES
(1, 'Men'),
(2, 'Women'),
(3, 'Kids');

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
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

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
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`UserID`, `UserName`, `Password`, `Email`, `ProfileImage`, `RoleID`) VALUES
(2, 'ahmed', 'ahmed', 'ahmed@gmail.com', '/Images/66acd6a93acd3.jpeg', 2),
(1, 'Abdallah22', 'admin', 'admin@admin.com', '/Images/66ad0e8b685d7.jpeg', 1);

-- --------------------------------------------------------

--
-- Table structure for table `users_phonenum`
--

CREATE TABLE `users_phonenum` (
  `PhoneNumID` int(11) NOT NULL,
  `PhoneNum` varchar(50) NOT NULL,
  `UserID` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

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
  ADD KEY `SexID` (`SexID`),
  ADD KEY `fk_user` (`UserID`);

--
-- Indexes for table `queuedetails`
--
ALTER TABLE `queuedetails`
  ADD PRIMARY KEY (`id`),
  ADD KEY `CategoireID` (`CategoireID`),
  ADD KEY `BrandID` (`BrandID`),
  ADD KEY `SexID` (`SexID`),
  ADD KEY `Color_ID` (`Color_ID`),
  ADD KEY `QueueID` (`QueueID`),
  ADD KEY `fk_user` (`UserID`);

--
-- Indexes for table `queuelist`
--
ALTER TABLE `queuelist`
  ADD PRIMARY KEY (`QueueID`),
  ADD KEY `UserID` (`UserID`);

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
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `orderdetails`
--
ALTER TABLE `orderdetails`
  MODIFY `OrderDetailsID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `prodcut_color`
--
ALTER TABLE `prodcut_color`
  MODIFY `Color_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `queuedetails`
--
ALTER TABLE `queuedetails`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `UserID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
