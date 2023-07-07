-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th7 05, 2023 lúc 08:20 AM
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
-- Cơ sở dữ liệu: `project_ii_ver02`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `freetime`
--

CREATE TABLE `freetime` (
  `id` int NOT NULL AUTO_INCREMENT,
  `teacher_id` int(8) NOT NULL,
  `starttime` datetime NOT NULL,
  `endtime` datetime DEFAULT NULL,
  PRIMARY KEY (Personid)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `freetime`
--

INSERT INTO `freetime` (`teacher_id`, `starttime`, `endtime`) VALUES
(19990131, '2023-07-03 08:00:00', '2023-07-03 09:30:00'),
(19990131, '2023-07-04 07:30:00', '2023-07-03 08:00:00'),
(19990131, '2023-07-05 07:30:00', '2023-07-05 08:00:00');

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
(20200001, 'IT4434', 'Ứng dụng IoT điều khiển thiết bị', 'Đồ án các công nghệ xây dựng hệ thống thông tin', 20222),
(20200006, 'IT5021E', 'Game giải đố: game engine đã hỗ trợ gì rồi', 'Graduation Research 1', 20222),
(20200014, 'IT5022', 'undefined', 'Nghiên cứu tốt nghiệp 2', 20222),
(20200017, 'IT3910Q', 'undefined', 'Project I', 20222),
(20200025, 'IT3931', 'Nhóm 1 giao diện web', 'Project II', 20222),
(20200029, 'IT3931', 'Nhóm 2', 'Project II', 20222),
(20200032, 'IT3920Q', 'Nhóm 3 Web', 'Project II', 20222),
(20200035, 'IT3920Q', 'Nhóm 4: Quản lý thông tin tour', 'Project II', 20222),
(20200037, 'IT3920Q', 'Nhóm 4 bis', 'Project II', 20222),
(20200039, 'IT3930E', 'Nhóm 5', 'Project II', 20222),
(20200041, 'IT3930', 'Nhóm riêng', 'Project II', 20222),
(20200042, 'IT4997', 'Hệ thống quản lý nguồn hàng -> Magento', 'Đồ án tốt nghiệp cử nhân', 20222),
(20200043, 'IT4997', 'Mô đun điểm thưởng và xếp hạng khách hàng  trên nền tảng Magento cho Theme Hyva.', 'Đồ án tốt nghiệp cử nhân', 20222),
(20200044, 'IT4997', 'Ứng dụng phi tập trung (dApp)', 'Đồ án tốt nghiệp cử nhân', 20222),
(20200045, 'IT4997', 'Web  Quản lý ký túc xá', 'Đồ án tốt nghiệp cử nhân', 20222),
(20200046, 'IT4997', 'Đề tài website dạy nấu ăn, phát triển thêm  gợi ý video, mua bán sản phẩm ', 'Đồ án tốt nghiệp cử nhân', 20222),
(20200047, 'IT4997', 'Ứng dụng chat + video call', 'Đồ án tốt nghiệp cử nhân', 20222),
(20200048, 'IT5150', 'App quản lý bãi gửi xe, giao diện cho người gửi và quản lý', 'Đồ án kỹ sư', 20222),
(20200049, 'IT5120E', 'Chuyển Bằng đã hướng dẫn GR1', 'Thesis', 20222),
(20200050, 'IT5120', '', 'Đồ án tốt nghiệp', 20222),
(20200051, 'IT5120', 'Web bán thiết bị điện tử, tích điểm thưởng, phân loại người dùng, tích điểm thưởng (admin có thể điều chỉnh), thanh toán online', 'Đồ án tốt nghiệp', 20222),
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
  `next_meeting_id` int(10) DEFAULT NULL,
  `report` longblob DEFAULT NULL,
  `endtime` datetime NOT NULL,
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `previous_meeting_id` int(10) DEFAULT NULL,
  `require_meeting` varchar(1000) DEFAULT NULL,
  `is_ended` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `meeting`
--

INSERT INTO `meeting` (`meeting_id`, `group_id`, `teacher_id`, `starttime`, `reportdeadline`, `note`, `next_meeting_id`, `report`, `endtime`, `title`, `previous_meeting_id`, `require_meeting`, `is_ended`) VALUES
(2022200101, 20222001, 19990131, '2023-05-24 10:30:00', '2023-06-29 00:00:00', '<p><br></p>', NULL, NULL, '2023-05-24 11:00:00', 'Họp buổi 1', NULL, 'yêu cầu buổi 1', 1),
(2022200102, 20222001, 19990131, '2023-06-16 15:00:00', '2023-06-29 23:59:59', '', NULL, NULL, '2023-06-16 17:00:00', 'Họp buổi 1', NULL, NULL, 0),
(2022200103, 20222001, 19990131, '2023-07-05 08:30:00', '2023-07-05 00:00:00', '<p><br></p>', NULL, NULL, '2023-07-05 09:30:00', 'title 4.7', 2022200102, 'require 4.7', 1),
(2022200104, 20222001, 19990131, '2023-07-06 08:30:00', '2023-07-12 00:00:00', '<p>ádas</p><p>á</p>', NULL, NULL, '2023-07-08 09:30:00', 'title update 5/7', 2022200103, 'this is new meeting 5/7', 1),
(2022200105, 20222001, 19990131, '2023-07-06 08:30:00', '2023-07-06 00:00:00', '<p>đây là note của project II</p>', NULL, NULL, '2023-07-06 09:00:00', 'title 5/7 ver 2', 2022200104, 'require 5/7 ver 2', 1),
(2022200201, 20222002, 19990131, '2023-07-01 08:00:00', '2023-07-06 11:55:00', '<p>a</p>', NULL, NULL, '2023-07-01 08:30:00', '', NULL, NULL, 1),
(2022200301, 20222003, 19990131, '2023-06-30 08:30:00', '2023-07-06 11:48:00', '<p><br></p>', NULL, NULL, '2023-06-30 09:00:00', '', NULL, NULL, 1),
(2022200302, 20222003, 19990131, '2023-07-01 09:30:00', '2023-07-06 11:50:00', 'nhóm 3 buổi 2', NULL, NULL, '2023-07-01 10:00:00', '', NULL, NULL, 0),
(2022200303, 20222003, 19990131, '2023-07-07 08:30:00', '2023-07-13 11:48:00', '', NULL, NULL, '2023-07-07 09:00:00', 'new title', 2022200302, 'new require', 0);

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
(20183714, 20200048, 'Nguyễn Vũ Đức', '123456', 'duc.nv183714@sis.hust.edu.vn', 123456789, '0000-00-00'),
(20183782, 20200001, 'Trần Khánh Lê', '123456', 'le.tk183782@sis.hust.edu.vn', 123456789, '0000-00-00'),
(20183847, 20200042, 'Nguyễn Phi Trường', '123456', 'truong.np183847@sis.hust.edu.vn', 123456789, '0000-00-00'),
(20183850, 20200043, 'Đỗ Quang Tùng', '123456', 'tung.dq183850@sis.hust.edu.vn', 123456789, '0000-00-00'),
(20184095, 20200014, 'Trần Thị Thu Hiền', '123456', 'hien.ttt184095@sis.hust.edu.vn', 123456789, '0000-00-00'),
(20184095, 20200050, 'Trần Thị Thu Hiền', '123456', 'hien.ttt184095@sis.hust.edu.vn', 123456789, '0000-00-00'),
(20184235, 20200014, 'Nguyễn Thành Vinh', '123456', 'vinh.nt184235@sis.hust.edu.vn', 123456789, '0000-00-00'),
(20184235, 20200051, 'Nguyễn Thành Vinh', '123456', 'vinh.nt184235@sis.hust.edu.vn', 123456789, '0000-00-00'),
(20184280, 20200006, 'Lê Ngọc Kiên', '123456', 'kien.ln184280@sis.hust.edu.vn', 123456789, '0000-00-00'),
(20184280, 20200049, 'Lê Ngọc Kiên', '123456', 'kien.ln184280@sis.hust.edu.vn', 123456789, '0000-00-00'),
(20190076, 20200044, 'Đào Xuân An', '123456', 'an.dx190076@sis.hust.edu.vn', 123456789, '0000-00-00'),
(20190146, 20200045, 'IV  NAVIN', '123456', 'navin.i190146@sis.hust.edu.vn', 123456789, '0000-00-00'),
(20192677, 20200001, 'Bùi Tùng Anh', '123456', 'anh.bt192677@sis.hust.edu.vn', 123456789, '0000-00-00'),
(20194223, 20200001, 'Nguyễn Thị Quỳnh Anh', '123456', 'anh.ntq194223@sis.hust.edu.vn', 123456789, '0000-00-00'),
(20194231, 20200001, 'Nguyễn Bá Bình', '123456', 'binh.nb194231@sis.hust.edu.vn', 123456789, '0000-00-00'),
(20194250, 20200046, 'Nguyễn Văn Đức', '123456', 'duc.nv194250@sis.hust.edu.vn', 123456789, '0000-00-00'),
(20194341, 20200047, 'Ngô Trọng Nghĩa', '123456', 'nghia.nt194341@sis.hust.edu.vn', 123456789, '0000-00-00'),
(20194610, 20200006, 'Bùi Anh Lượng', '123456', 'luong.ba194610@sis.hust.edu.vn', 123456789, '0000-00-00'),
(20194725, 20200006, 'Nguyễn Hải Anh', '123456', 'anh.nh194725@sis.hust.edu.vn', 123456789, '0000-00-00'),
(20194726, 20200006, 'Nguyễn Quốc Anh', '123456', 'anh.nq194726@sis.hust.edu.vn', 123456789, '0000-00-00'),
(20194731, 20200006, 'Phạm Thành Biên', '123456', 'bien.pt194731@sis.hust.edu.vn', 123456789, '0000-00-00'),
(20198160, 20200001, 'Nguyễn Ngô Hoàng Anh', '123456', 'anh.nnh198160@sis.hust.edu.vn', 123456789, '0000-00-00'),
(20198186, 20200035, 'Ngô Thị Mỹ Linh', '123456', 'linh.ntm198186@sis.hust.edu.vn', 123456789, '0000-00-00'),
(20198187, 20200035, 'Nguyễn Thị Linh', '123456', 'linh.nt198187@sis.hust.edu.vn', 123456789, '0000-00-00'),
(20198197, 20200032, 'Nguyễn Thái An', '123456', 'an.nt198197@sis.hust.edu.vn', 123456789, '0000-00-00'),
(20198201, 20200032, 'Lê Đình Hoàng Anh', '123456', 'anh.ldh198201@sis.hust.edu.vn', 123456789, '0000-00-00'),
(20198202, 20200032, 'Lê Đức Anh', '123456', 'anh.ld198202@sis.hust.edu.vn', 123456789, '0000-00-00'),
(20198290, 20200017, 'Vũ Mạnh Dũng', '123456', 'dung.vm198290@sis.hust.edu.vn', 123456789, '0000-00-00'),
(20198323, 20200017, 'Lê Đoàn Anh Quân', '123456', 'quan.lda198323@sis.hust.edu.vn', 123456789, '0000-00-00'),
(20198328, 20200017, 'Vũ Thị Quỳnh', '123456', 'quynh.vt198328@sis.hust.edu.vn', 123456789, '0000-00-00'),
(20198333, 20200017, 'Đinh Thanh Thuỷ', '123456', 'thuy.dt198333@sis.hust.edu.vn', 123456789, '0000-00-00'),
(20200029, 20200006, 'Nguyễn Nhật Anh', '123456', 'anh.nn200029@sis.hust.edu.vn', 123456789, '0000-00-00'),
(20200035, 20200017, 'Nguyễn Thị Vân Anh', '123456', 'anh.ntv200035@sis.hust.edu.vn', 123456789, '0000-00-00'),
(20200155, 20200017, 'Hoàng Hữu Đôn', '123456', 'don.hh200155@sis.hust.edu.vn', 123456789, '0000-00-00'),
(20200563, 20200006, 'Nguyễn Quang Tuấn', '123456', 'tuan.nq200563@sis.hust.edu.vn', 123456789, '0000-00-00'),
(20200586, 20200006, 'Đỗ Đức Thành', '123456', 'thanh.dd200586@sis.hust.edu.vn', 123456789, '0000-00-00'),
(20200604, 20200039, 'Trần Lê Phương Thảo', '123456', 'thao.tlp200604@sis.hust.edu.vn', 123456789, '0000-00-00'),
(20200661, 20200039, 'Đào Trọng Việt', '123456', 'viet.dt200661@sis.hust.edu.vn', 123456789, '0000-00-00'),
(20204501, 20222001, 'Hà Bùi Phúc', '123456', 'phuc.habui@gmail.com', 851111886, '2002-06-12'),
(20204502, 20222001, 'Dương Kim Nam', '123456', 'nam.duongkim@gmail.com', 859923333, '0000-00-00'),
(20204765, 20200025, 'Dương Kim Nam', '123456', 'nam.dk204765@sis.hust.edu.vn', 123456789, '0000-00-00'),
(20204767, 20200025, 'Giang Trung Nghĩa', '123456', 'nghia.gt204767@sis.hust.edu.vn', 123456789, '0000-00-00'),
(20204767, 20222001, 'Giang Trung Nghĩa', '123456', 'nghia2905.per@gmail.com', 859922886, '2002-05-29'),
(20204768, 20200029, 'Nguyễn Mạnh Nghĩa', '123456', 'nghia.nm204768@sis.hust.edu.vn', 123456789, '0000-00-00'),
(20204769, 20200025, 'Mai Xuân Ngọc', '123456', 'ngoc.mx204769@sis.hust.edu.vn', 123456789, '0000-00-00'),
(20204769, 20222001, 'Mai Xuân Ngọc', '123456', 'ngoccbe.per@gmail.com', 859922777, '0000-00-00'),
(20204771, 20200029, 'Triệu Tuyên Nhâm', '123456', 'nham.tt204771@sis.hust.edu.vn', 123456789, '0000-00-00'),
(20204773, 20200025, 'Hà Bùi Phúc', '123456', 'phuc.hb204773@sis.hust.edu.vn', 123456789, '0000-00-00'),
(20204775, 20200029, 'Hà Văn Quang', '123456', 'quang.hv204775@sis.hust.edu.vn', 123456789, '0000-00-00'),
(20205225, 20200041, 'Nguyễn Thu Trang', '123456', 'trang.nt205225@sis.hust.edu.vn', 123456789, '0000-00-00'),
(20207586, 20200017, 'Lê Kỳ Anh', '123456', 'anh.lk207586@sis.hust.edu.vn', 123456789, '0000-00-00'),
(20207696, 20200037, 'Nguyễn Quang Nhật', '123456', 'nhat.nq207696@sis.hust.edu.vn', 123456789, '0000-00-00'),
(20207698, 20200037, 'Phạm Đức Phúc', '123456', 'phuc.pd207698@sis.hust.edu.vn', 123456789, '0000-00-00'),
(20214883, 20200017, 'Nguyễn Việt Dũng', '123456', 'dung.nv214883@sis.hust.edu.vn', 123456789, '0000-00-00'),
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
-- Chỉ mục cho bảng `freetime`
--
ALTER TABLE `freetime`
  ADD KEY `freetime_ibfk_1` (`teacher_id`);

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
-- Các ràng buộc cho bảng `freetime`
--
ALTER TABLE `freetime`
  ADD CONSTRAINT `freetime_ibfk_1` FOREIGN KEY (`teacher_id`) REFERENCES `teacher` (`teacher_id`);

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
