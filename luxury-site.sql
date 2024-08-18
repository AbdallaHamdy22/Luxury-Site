-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 18, 2024 at 04:15 PM
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
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `brand`
--

INSERT INTO `brand` (`BrandID`, `Name`, `Image`) VALUES
(1, 'ROLEX', '/Images/rolex-logo-uhd-4k-wallpaper.jpg'),
(2, 'DIOR', '/Images/Dior brand.png'),
(3, 'GOYARD', '/Images/goyard-alb.png'),
(4, 'LOUIS VUITTON', '/Images/LV brand.png'),
(5, 'AUDEMARS PIGUET', '/Images/Audemars-Piguet-Logo.jpg'),
(6, 'PRADA', '/Images/Prada brand.png'),
(7, 'DOLCE&GABBANA', '/Images/Dolce brand.png'),
(8, 'CHANEL', '/Images/chanel brand.webp'),
(10, 'HERMES', '/Images/a2da9900d7d4c7b800040e6b8ef1b3bc.jpg'),
(14, 'Yves Saint Laurent (YSL)', '/Images/f508cdaf37e5d07b4ab2cfa59c865a9d.jpg'),
(24, 'PATEK PHILIPPE', '/Images/patek_philippe_geneve_logo.png'),
(12, 'GUCCI', '/Images/gaCpnt.jpg'),
(16, 'BURBERRY', '/Images/burberry14.png'),
(18, 'CELINE', '/Images/467dd90fae9a31da1be093d7e4ff6d08.png'),
(20, 'FENDI', '/Images/fendi-hpqhgxag3a8q35uv.jpg'),
(22, 'VERSACE', '/Images/6abff4dbaa911ddc083c617b0b0a1ad8.jpg'),
(26, 'CARTIER', '/Images/c0cd7a04d6b44e359dcfa0e0a70fd494.jpg'),
(28, 'BVLGARI', '/Images/png-transparent-bvlgari-hd-logo.png'),
(30, 'VAN CLEEF & ARPELS', '/Images/3834785449f3ba621012e116eab98e71.jpg'),
(32, 'CHOPARD', '/Images/chopard-logo.png'),
(34, 'TIFFANY & CO.', '/Images/tiffany-co-logo.png'),
(36, 'FRANCK MULLER', '/Images/png-transparent-franck-muller-geneve-hd-lo');

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
(1, 'BAGS', '/Images/download.jpg'),
(2, 'WATCHES', '/Images/DSC0111.jpg'),
(4, 'FINE JEWELRY ', '/Images/2024-Icons-HP-Carousel-T.jpg');

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

--
-- Dumping data for table `orderdetails`
--

INSERT INTO `orderdetails` (`OrderDetailsID`, `Quantity`, `Price`, `OrderID`, `ProductID`) VALUES
(3, 6, 5, 2, 7),
(4, 15, 13223, 3, 7);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `OrderID` int(11) NOT NULL,
  `OrderDate` varchar(50) NOT NULL,
  `Status` varchar(20) NOT NULL,
  `Address` varchar(200) NOT NULL,
  `Street` varchar(200) NOT NULL,
  `ApartmentNumber` varchar(50) NOT NULL,
  `City` varchar(50) NOT NULL,
  `State` varchar(50) NOT NULL,
  `ZipCode` varchar(11) NOT NULL,
  `Country` varchar(70) NOT NULL,
  `PhoneNumber` varchar(20) NOT NULL,
  `Notes` varchar(250) NOT NULL,
  `UserID` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`OrderID`, `OrderDate`, `Status`, `Address`, `Street`, `ApartmentNumber`, `City`, `State`, `ZipCode`, `Country`, `PhoneNumber`, `Notes`, `UserID`) VALUES
(2, '2024-08-17 23:20:15', 'done', '', '', '', '', '', '', '', '', '', 1),
(1, '2024-08-17 23:17:23', 'pending', '', '', '', '', '', '', '', '', '', 1),
(3, '2024-08-17 23:41:47', 'pending', 'here', 'october', '66/23', 'giza', 'giza', '115522', 'egypt', '01111141320', 'no note', 1);

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
(6, 'Black'),
(7, 'Yellow'),
(9, 'Gold'),
(10, 'Brown');

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
  `MainQuantity` int(11) DEFAULT NULL,
  `OfferPrice` float DEFAULT NULL,
  `ProductionYear` varchar(50) NOT NULL,
  `Image` varchar(1000) NOT NULL,
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
(10, 'Van Cleef & Arpels Vintage Alhambra 18K yellow gol', 'Van Cleef & Arpels Vintage Alhambra 18K yellow gold, Agate Bracelets', 18000, 0, 2, 1, 17897, '2020', '/Images/6687c33291dcc.jpeg', 30, 4, 7, 2, 1, 'Available'),
(11, 'Hermes Bleu Celeste/Mykonos Epsom Leather Palladiu', 'The Hermes Birkin is rightly one of the most desired handbags in the world. Handcrafted from the highest quality leather by skilled artisans, it takes long hours of rigorous effort to stitch a Birkin ', 49112, 0, 1, 1, 49600, '2011', '/Images/luxury-women-hermes-new-handbags-p993234-011.jpg', 10, 1, 2, 2, 1, 'Available'),
(9, 'Rolex Black Yellow Gold, Stainless Steel, Diamond ', 'Rolex Black Yellow Gold, Stainless Steel, Diamond Datejust 126233 Automatic Women\'sÂ Wristwatch', 58000, 0, 2, 1, 58000, '2024', '/Images/WhatsApp Image 2024-07-30 at 16.26.44_292bfd3b.jpg', 1, 2, 9, 2, 1, 'Available'),
(7, 'Hermes Gold Togo Leather Gold Finish Birkin 35 Bag', '\r\nThe Hermes Birkin is rightly one of the most des', 45.999, 39.999, 1, 0, 39, '0', '/Images/66bf510689c31.jpg,/Images/66bf51068a152.jpg,/Images/66bf51068a713.jpg', 10, 1, 9, 2, 1, 'OnSale'),
(8, 'Franck Muller Silver Stainless Steel Alligator Lea', 'Franck Muller Silver Stainless Steel Alligator Lea', 65054, 55, 2, 0, 15, '0', '/Images/66bf534aa2298.jpg,/Images/66bf534aa2592.jpg', 36, 2, 7, 2, 1, 'OnSale'),
(12, 'Van Cleef & Arpels White Gold And Turquoise Neckla', 'Van Cleef & Arpels White Gold And Turquoise 10', 265000, 0, 1, 1, 0, '0', '/Images/download.png', 30, 4, 2, 2, 1, 'Available'),
(13, 'Rolex White Cosmograph Daytona Women\'s Wristwatch	', 'Rolex White Cosmograph Daytona Women\'s Wristwatch	', 164999, 0, 1, 1, 0, '2006', '/Images/WhatsApp Image 2024-08-17 at 17.56.10_0a8eda49.jpg', 1, 2, 9, 2, 1, 'Available'),
(14, 'Hermes Leather Kelly 32 Top Handle Bags', 'never used', 58225, 0, 1, 1, 0, '2014', '/Images/662a2194afd8b.png', 10, 1, 10, 2, 1, 'Available');

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

--
-- Dumping data for table `queuelist`
--

INSERT INTO `queuelist` (`QueueID`, `UserID`) VALUES
(1, 1);

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
(2, 'Women');

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
(1, 'Admin', 'admin', 'admin@admin.com', '/Images/66be26e88e56b.jpeg', 1),
(16, 'Mohamed Bahaa', '123456', 'bahaa@gmail.com', '/Images/66b9f11dbb77f.jpeg', 2),
(17, 'abdalla hamdy', 'alal10', 'bedohamdy190@gmail.com', '', 2),
(5, 'Abdullah', 'abdo', 'abdalla.hamdy@gmail.com', '/Images/66bbe5da6fc49.jpeg', 1),
(18, 'khalid othman', 'inzaghi9', 'kmedhat78@gmail.com', '', 2),
(19, 'Rina Abdelhafiz', 'rinaa123', 'rinaabdelhafiz638@gmail.com', '', 2);

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
  MODIFY `OrderDetailsID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `prodcut_color`
--
ALTER TABLE `prodcut_color`
  MODIFY `Color_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `queuedetails`
--
ALTER TABLE `queuedetails`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=89;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `UserID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
