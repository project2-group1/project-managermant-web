-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th6 25, 2023 lúc 03:48 PM
-- Phiên bản máy phục vụ: 10.4.27-MariaDB
-- Phiên bản PHP: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `project_ii_ver01`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `groupstudent`
--

CREATE TABLE `groupstudent` (
  `group_id` int(8) NOT NULL,
  `course_id` varchar(8) NOT NULL,
  `projectname` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `coursename` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `term` int(5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `groupstudent`
--

INSERT INTO `groupstudent` (`group_id`, `course_id`, `projectname`, `coursename`, `term`) VALUES
(20222001, 'IT3931', 'Project Management Website', 'Project II', 20222),
(20222002, 'IT3931', 'Gunny Game Website', 'Project II', 20222),
(20222003, 'IT3931', 'Learn English Application', 'Project III', 20222),
(20222004, 'IT3931', 'Artificial Intelligence', 'Project II', 20222);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `meeting`
--

CREATE TABLE `meeting` (
  `meeting_id` int(10) NOT NULL,
  `group_id` int(8) NOT NULL,
  `teacher_id` int(8) NOT NULL,
  `starttime` datetime NOT NULL,
  `reportdeadline` datetime DEFAULT NULL,
  `note` varchar(1000) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `next_meeting_id` int(8) DEFAULT NULL,
  `report` longblob DEFAULT NULL,
  `endtime` datetime DEFAULT NULL,
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `meeting`
--

INSERT INTO `meeting` (`meeting_id`, `group_id`, `teacher_id`, `starttime`, `reportdeadline`, `note`, `next_meeting_id`, `report`, `endtime`, `title`) VALUES
(2022200101, 20222001, 19990131, '2023-05-24 10:30:00', '2023-06-29 00:00:00', 'Lập trình database', NULL, NULL, '2023-05-24 11:00:00', 'Họp buổi 1'),
(2022200102, 20222001, 19990131, '2023-06-16 15:00:00', '2023-06-29 23:59:59', '', NULL, NULL, '2023-06-16 17:00:00', 'Họp buổi 1'),
(2022200103, 20222001, 19990131, '2023-06-21 13:30:00', '2023-06-30 23:59:00', 'Báo cáo tiến độ lần 3', NULL, NULL, '2023-06-21 14:30:00', 'Họp buổi 1'),
(2022200104, 20222001, 19990131, '2023-06-22 08:30:00', '0000-00-00 00:00:00', '', NULL, NULL, '2023-06-22 11:30:00', 'Họp buổi 1'),
(2022200105, 20222001, 19990131, '2023-06-20 08:30:00', '0000-00-00 00:00:00', 'test', NULL, NULL, '2023-06-20 09:30:00', 'Họp buổi 1'),
(2022200106, 20222001, 19990131, '2023-06-21 13:00:00', '0000-00-00 00:00:00', '', NULL, NULL, '2023-06-21 14:00:00', 'Họp buổi 1'),
(2022200107, 20222001, 19990131, '0000-00-00 00:00:00', '0000-00-00 00:00:00', '', NULL, NULL, '0000-00-00 00:00:00', 'Họp buổi 1'),
(2022200202, 20222002, 19990131, '2023-06-23 11:30:00', '0000-00-00 00:00:00', 'Note của nhóm 2', NULL, NULL, '2023-06-23 11:30:00', 'Họp buổi 2'),
(2022200203, 20222002, 19990131, '2023-06-24 09:30:00', '0000-00-00 00:00:00', 'note 3', NULL, NULL, '2023-06-24 10:30:00', 'Họp buổi 2');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `student`
--

CREATE TABLE `student` (
  `student_id` int(8) NOT NULL,
  `group_id` int(8) NOT NULL,
  `fullname` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `email` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `phonenumber` int(12) NOT NULL,
  `birthday` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `student`
--

INSERT INTO `student` (`student_id`, `group_id`, `fullname`, `password`, `email`, `phonenumber`, `birthday`) VALUES
(20204501, 20222001, 'Hà Bùi Phúc', '123456', 'phuc.habui@gmail.com', 851111886, '2002-06-12'),
(20204502, 20222001, 'Dương Kim Nam', '123456', 'nam.duongkim@gmail.com', 859923333, '0000-00-00'),
(20204767, 20222001, 'Giang Trung Nghĩa', '123456', 'nghia2905.per@gmail.com', 859922886, '2002-05-29'),
(20204769, 20222001, 'Mai Xuân Ngọc', '123456', 'ngoccbe.per@gmail.com', 859922777, '0000-00-00'),
(20214942, 20222002, 'Hoàng Mạnh Nam', '123456', 'nam.hoangmanh@sis.hust.edu.com', 859922999, '2003-06-12');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `teacher`
--

CREATE TABLE `teacher` (
  `teacher_id` int(8) NOT NULL,
  `fullname` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `address` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `phonenumber` int(12) NOT NULL,
  `email` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `teacher`
--

INSERT INTO `teacher` (`teacher_id`, `fullname`, `password`, `address`, `phonenumber`, `email`) VALUES
(19990131, 'Nguyễn Thị Diệu Linh', '123456', 'Đống Đa Hà Nội', 983545288, 'linh.nguyenthidieu@hust.edu.vn'),
(20100001, 'Tạ Hải Tùng', '123456', 'Ba Đình Hà Nội', 981111288, 'tung.tahai@hust.edu.vn'),
(20110003, 'Lã Thế Vinh', '123456', 'Hoàng Mai Hà Nội', 981122288, 'vinh.lathe@hust.edu.vn');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `groupstudent`
--
ALTER TABLE `groupstudent`
  ADD PRIMARY KEY (`group_id`);

--
-- Chỉ mục cho bảng `meeting`
--
ALTER TABLE `meeting`
  ADD PRIMARY KEY (`meeting_id`,`group_id`,`teacher_id`),
  ADD KEY `FK_MeetingID_To_GroupID` (`group_id`),
  ADD KEY `FK_TeacherID` (`teacher_id`);

--
-- Chỉ mục cho bảng `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`student_id`,`group_id`),
  ADD KEY `FK_GroupID` (`group_id`);

--
-- Chỉ mục cho bảng `teacher`
--
ALTER TABLE `teacher`
  ADD PRIMARY KEY (`teacher_id`);

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `meeting`
--
ALTER TABLE `meeting`
  ADD CONSTRAINT `FK_MeetingID_To_GroupID` FOREIGN KEY (`group_id`) REFERENCES `groupstudent` (`group_id`),
  ADD CONSTRAINT `FK_TeacherID` FOREIGN KEY (`teacher_id`) REFERENCES `teacher` (`teacher_id`);

--
-- Các ràng buộc cho bảng `student`
--
ALTER TABLE `student`
  ADD CONSTRAINT `FK_GroupID` FOREIGN KEY (`group_id`) REFERENCES `groupstudent` (`group_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
