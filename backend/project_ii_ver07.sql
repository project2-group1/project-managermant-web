-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 02, 2023 at 11:50 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `project_ii_ver07`
--

-- --------------------------------------------------------

--
-- Table structure for table `freetime`
--

CREATE TABLE `freetime` (
  `id` int(11) NOT NULL,
  `teacher_id` int(8) NOT NULL,
  `starttime` datetime NOT NULL,
  `endtime` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `freetime`
--

INSERT INTO `freetime` (`id`, `teacher_id`, `starttime`, `endtime`) VALUES
(2, 19990131, '2023-07-06 07:30:00', '2023-07-06 08:00:00'),
(3, 19990131, '2023-07-07 07:30:00', '2023-07-07 08:00:00'),
(6, 19990131, '2023-07-06 10:00:00', '2023-07-06 10:30:00'),
(8, 19990131, '2023-07-09 11:00:00', '2023-07-09 11:30:00'),
(24, 19990131, '2023-07-08 08:30:00', '2023-07-08 09:00:00'),
(25, 19990131, '2023-07-08 09:30:00', '2023-07-08 10:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `groupstudent`
--

CREATE TABLE `groupstudent` (
  `group_id` int(8) NOT NULL,
  `course_id` varchar(8) NOT NULL,
  `projectname` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `coursename` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `term` int(5) DEFAULT NULL,
  `teacher_id` int(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Dumping data for table `groupstudent`
--

INSERT INTO `groupstudent` (`group_id`, `course_id`, `projectname`, `coursename`, `term`, `teacher_id`) VALUES
(20200001, 'IT4434', 'Ứng dụng IoT điều khiển thiết bị', 'Đồ án các công nghệ xây dựng hệ thống thông tin', 20222, 19990131),
(20200006, 'IT5021E', 'Game giải đố: game engine đã hỗ trợ gì rồi', 'Graduation Research 1', 20222, 19990131),
(20200014, 'IT5022', 'undefined', 'Nghiên cứu tốt nghiệp 2', 20222, 19990131),
(20200017, 'IT3910Q', 'undefined', 'Project I', 20222, 19990131),
(20200025, 'IT3931', 'Nhóm 1 giao diện web', 'Project II', 20222, 19990131),
(20200029, 'IT3931', 'Nhóm 2', 'Project II', 20222, 19990131),
(20200032, 'IT3920Q', 'Nhóm 3 Web', 'Project II', 20222, 19990131),
(20200035, 'IT3920Q', 'Nhóm 4: Quản lý thông tin tour', 'Project II', 20222, 19990131),
(20200037, 'IT3920Q', 'Nhóm 4 bis', 'Project II', 20222, 19990131),
(20200039, 'IT3930E', 'Nhóm 5', 'Project II', 20222, 19990131),
(20200041, 'IT3930', 'Nhóm riêng', 'Project II', 20222, 19990131),
(20200042, 'IT4997', 'Hệ thống quản lý nguồn hàng -> Magento', 'Đồ án tốt nghiệp cử nhân', 20222, 19990131),
(20200043, 'IT4997', 'Mô đun điểm thưởng và xếp hạng khách hàng  trên nền tảng Magento cho Theme Hyva.', 'Đồ án tốt nghiệp cử nhân', 20222, 19990131),
(20200044, 'IT4997', 'Ứng dụng phi tập trung (dApp)', 'Đồ án tốt nghiệp cử nhân', 20222, 19990131),
(20200045, 'IT4997', 'Web  Quản lý ký túc xá', 'Đồ án tốt nghiệp cử nhân', 20222, 19990131),
(20200046, 'IT4997', 'Đề tài website dạy nấu ăn, phát triển thêm  gợi ý video, mua bán sản phẩm ', 'Đồ án tốt nghiệp cử nhân', 20222, 19990131),
(20200047, 'IT4997', 'Ứng dụng chat + video call', 'Đồ án tốt nghiệp cử nhân', 20222, 19990131),
(20200048, 'IT5150', 'App quản lý bãi gửi xe, giao diện cho người gửi và quản lý', 'Đồ án kỹ sư', 20222, 19990131),
(20200049, 'IT5120E', 'Chuyển Bằng đã hướng dẫn GR1', 'Thesis', 20222, 19990131),
(20200050, 'IT5120', '', 'Đồ án tốt nghiệp', 20222, 19990131),
(20200051, 'IT5120', 'Web bán thiết bị điện tử, tích điểm thưởng, phân loại người dùng, tích điểm thưởng (admin có thể điều chỉnh), thanh toán online', 'Đồ án tốt nghiệp', 20222, 19990131),
(20222001, 'IT3931', 'Project Management Website', 'Project II', 20222, 19990131),
(20222002, 'IT3931', 'Gunny Game Website', 'Project II', 20222, 19990131),
(20222003, 'IT3931', 'Learn English Application', 'Project III', 20222, 19990131),
(20222004, 'IT3931', 'Artificial Intelligence', 'Project II', 20222, 19990131);

-- --------------------------------------------------------

--
-- Table structure for table `gr_st`
--

CREATE TABLE `gr_st` (
  `group_id` int(8) NOT NULL,
  `student_id` int(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `gr_st`
--

INSERT INTO `gr_st` (`group_id`, `student_id`) VALUES
(20222001, 20204501),
(20222001, 20204765),
(20222001, 20204767),
(20222001, 20204769);

-- --------------------------------------------------------

--
-- Table structure for table `meeting`
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
  `require_meeting` varchar(1000) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `note_teacher` varchar(1000) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `state` varchar(20) NOT NULL,
  `is_read` int(1) NOT NULL DEFAULT 0,
  `reason_reschedule` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Dumping data for table `meeting`
--

INSERT INTO `meeting` (`meeting_id`, `group_id`, `teacher_id`, `starttime`, `reportdeadline`, `note`, `next_meeting_id`, `report`, `endtime`, `title`, `previous_meeting_id`, `require_meeting`, `note_teacher`, `created_at`, `state`, `is_read`, `reason_reschedule`) VALUES
(2022200102, 20222001, 19990131, '2023-08-04 10:30:00', '2023-08-04 17:00:00', '', NULL, NULL, '2023-08-04 11:30:00', 'Định hướng sản phẩm', 2022200101, '- Phân tích thiết kế\r\n- Thiết kế Database\r\n- Cấu trúc code', NULL, '2023-08-02 08:48:30', 'reschedule', 0, NULL),
(2022200103, 20222001, 19990131, '2023-08-06 09:30:00', '2023-08-06 00:00:00', '', NULL, NULL, '2023-08-06 10:30:00', 'title', 2022200102, 'require', NULL, '2023-08-02 09:12:31', 'pending', 0, NULL),
(2022200104, 20222001, 19990131, '2023-08-05 08:30:00', '2023-08-05 00:00:00', '', NULL, NULL, '2023-08-05 09:00:00', '1', 2022200103, '1', NULL, '2023-08-02 09:12:57', 'pending', 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `request_reschedule`
--

CREATE TABLE `request_reschedule` (
  `meeting_id` int(10) NOT NULL,
  `starttime` datetime NOT NULL,
  `endtime` datetime NOT NULL,
  `reason_reschedule` varchar(255) DEFAULT NULL,
  `reportdeadline` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `request_reschedule`
--

INSERT INTO `request_reschedule` (`meeting_id`, `starttime`, `endtime`, `reason_reschedule`, `reportdeadline`) VALUES
(2022200102, '2023-08-05 10:30:00', '2023-08-05 11:30:00', 'đi viện', '2023-08-05 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `student_id` int(8) NOT NULL,
  `fullname` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `email` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `phonenumber` int(12) NOT NULL,
  `birthday` date DEFAULT NULL,
  `avatar` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`student_id`, `fullname`, `password`, `email`, `phonenumber`, `birthday`, `avatar`) VALUES
(20183714, 'Nguyễn Vũ Đức', '123456', 'duc.nv183714@sis.hust.edu.vn', 123456789, '0000-00-00', NULL),
(20183782, 'Trần Khánh Lê', '123456', 'le.tk183782@sis.hust.edu.vn', 123456789, '0000-00-00', NULL),
(20183847, 'Nguyễn Phi Trường', '123456', 'truong.np183847@sis.hust.edu.vn', 123456789, '0000-00-00', NULL),
(20183850, 'Đỗ Quang Tùng', '123456', 'tung.dq183850@sis.hust.edu.vn', 123456789, '0000-00-00', NULL),
(20184095, 'Trần Thị Thu Hiền', '123456', 'hien.ttt184095@sis.hust.edu.vn', 123456789, '0000-00-00', NULL),
(20184095, 'Trần Thị Thu Hiền', '123456', 'hien.ttt184095@sis.hust.edu.vn', 123456789, '0000-00-00', NULL),
(20184235, 'Nguyễn Thành Vinh', '123456', 'vinh.nt184235@sis.hust.edu.vn', 123456789, '0000-00-00', NULL),
(20184235, 'Nguyễn Thành Vinh', '123456', 'vinh.nt184235@sis.hust.edu.vn', 123456789, '0000-00-00', NULL),
(20184280, 'Lê Ngọc Kiên', '123456', 'kien.ln184280@sis.hust.edu.vn', 123456789, '0000-00-00', NULL),
(20184280, 'Lê Ngọc Kiên', '123456', 'kien.ln184280@sis.hust.edu.vn', 123456789, '0000-00-00', NULL),
(20190076, 'Đào Xuân An', '123456', 'an.dx190076@sis.hust.edu.vn', 123456789, '0000-00-00', NULL),
(20190146, 'IV  NAVIN', '123456', 'navin.i190146@sis.hust.edu.vn', 123456789, '0000-00-00', NULL),
(20192677, 'Bùi Tùng Anh', '123456', 'anh.bt192677@sis.hust.edu.vn', 123456789, '0000-00-00', NULL),
(20194223, 'Nguyễn Thị Quỳnh Anh', '123456', 'anh.ntq194223@sis.hust.edu.vn', 123456789, '0000-00-00', NULL),
(20194231, 'Nguyễn Bá Bình', '123456', 'binh.nb194231@sis.hust.edu.vn', 123456789, '0000-00-00', NULL),
(20194250, 'Nguyễn Văn Đức', '123456', 'duc.nv194250@sis.hust.edu.vn', 123456789, '0000-00-00', NULL),
(20194341, 'Ngô Trọng Nghĩa', '123456', 'nghia.nt194341@sis.hust.edu.vn', 123456789, '0000-00-00', NULL),
(20194610, 'Bùi Anh Lượng', '123456', 'luong.ba194610@sis.hust.edu.vn', 123456789, '0000-00-00', NULL),
(20194725, 'Nguyễn Hải Anh', '123456', 'anh.nh194725@sis.hust.edu.vn', 123456789, '0000-00-00', NULL),
(20194726, 'Nguyễn Quốc Anh', '123456', 'anh.nq194726@sis.hust.edu.vn', 123456789, '0000-00-00', NULL),
(20194731, 'Phạm Thành Biên', '123456', 'bien.pt194731@sis.hust.edu.vn', 123456789, '0000-00-00', NULL),
(20198160, 'Nguyễn Ngô Hoàng Anh', '123456', 'anh.nnh198160@sis.hust.edu.vn', 123456789, '0000-00-00', NULL),
(20198186, 'Ngô Thị Mỹ Linh', '123456', 'linh.ntm198186@sis.hust.edu.vn', 123456789, '0000-00-00', NULL),
(20198187, 'Nguyễn Thị Linh', '123456', 'linh.nt198187@sis.hust.edu.vn', 123456789, '0000-00-00', NULL),
(20198197, 'Nguyễn Thái An', '123456', 'an.nt198197@sis.hust.edu.vn', 123456789, '0000-00-00', NULL),
(20198201, 'Lê Đình Hoàng Anh', '123456', 'anh.ldh198201@sis.hust.edu.vn', 123456789, '0000-00-00', NULL),
(20198202, 'Lê Đức Anh', '123456', 'anh.ld198202@sis.hust.edu.vn', 123456789, '0000-00-00', NULL),
(20198290, 'Vũ Mạnh Dũng', '123456', 'dung.vm198290@sis.hust.edu.vn', 123456789, '0000-00-00', NULL),
(20198323, 'Lê Đoàn Anh Quân', '123456', 'quan.lda198323@sis.hust.edu.vn', 123456789, '0000-00-00', NULL),
(20198328, 'Vũ Thị Quỳnh', '123456', 'quynh.vt198328@sis.hust.edu.vn', 123456789, '0000-00-00', NULL),
(20198333, 'Đinh Thanh Thuỷ', '123456', 'thuy.dt198333@sis.hust.edu.vn', 123456789, '0000-00-00', NULL),
(20200029, 'Nguyễn Nhật Anh', '123456', 'anh.nn200029@sis.hust.edu.vn', 123456789, '0000-00-00', NULL),
(20200035, 'Nguyễn Thị Vân Anh', '123456', 'anh.ntv200035@sis.hust.edu.vn', 123456789, '0000-00-00', NULL),
(20200155, 'Hoàng Hữu Đôn', '123456', 'don.hh200155@sis.hust.edu.vn', 123456789, '0000-00-00', NULL),
(20200563, 'Nguyễn Quang Tuấn', '123456', 'tuan.nq200563@sis.hust.edu.vn', 123456789, '0000-00-00', NULL),
(20200586, 'Đỗ Đức Thành', '123456', 'thanh.dd200586@sis.hust.edu.vn', 123456789, '0000-00-00', NULL),
(20200604, 'Trần Lê Phương Thảo', '123456', 'thao.tlp200604@sis.hust.edu.vn', 123456789, '0000-00-00', NULL),
(20200661, 'Đào Trọng Việt', '123456', 'viet.dt200661@sis.hust.edu.vn', 123456789, '0000-00-00', NULL),
(20204501, 'Hà Bùi Phúc', '123456', 'phuc.habui@gmail.com', 123456789, '2002-06-12', NULL),
(20204765, 'Dương Kim Nam', '123456', 'nam.dk204765@sis.hust.edu.vn', 123456789, '0000-00-00', NULL),
(20204767, 'Giang Trung Nghĩa', '123456', 'nghia2905.per@gmail.com', 123456789, '2002-05-29', NULL),
(20204768, 'Nguyễn Mạnh Nghĩa', '123456', 'nghia.nm204768@sis.hust.edu.vn', 123456789, '0000-00-00', NULL),
(20204769, 'Mai Xuân Ngọc', '123456', 'ngoc.mx204769@sis.hust.edu.vn', 123456789, '0000-00-00', NULL),
(20204771, 'Triệu Tuyên Nhâm', '123456', 'nham.tt204771@sis.hust.edu.vn', 123456789, '0000-00-00', NULL),
(20204773, 'Hà Bùi Phúc', '123456', 'phuc.hb204773@sis.hust.edu.vn', 123456789, '0000-00-00', NULL),
(20204775, 'Hà Văn Quang', '123456', 'quang.hv204775@sis.hust.edu.vn', 123456789, '0000-00-00', NULL),
(20205225, 'Nguyễn Thu Trang', '123456', 'trang.nt205225@sis.hust.edu.vn', 123456789, '0000-00-00', NULL),
(20207586, 'Lê Kỳ Anh', '123456', 'anh.lk207586@sis.hust.edu.vn', 123456789, '0000-00-00', NULL),
(20207696, 'Nguyễn Quang Nhật', '123456', 'nhat.nq207696@sis.hust.edu.vn', 123456789, '0000-00-00', NULL),
(20207698, 'Phạm Đức Phúc', '123456', 'phuc.pd207698@sis.hust.edu.vn', 123456789, '0000-00-00', NULL),
(20214883, 'Nguyễn Việt Dũng', '123456', 'dung.nv214883@sis.hust.edu.vn', 123456789, '0000-00-00', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `teacher`
--

CREATE TABLE `teacher` (
  `teacher_id` int(8) NOT NULL,
  `fullname` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `address` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `phonenumber` int(12) NOT NULL,
  `email` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `avatar` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Dumping data for table `teacher`
--

INSERT INTO `teacher` (`teacher_id`, `fullname`, `password`, `address`, `phonenumber`, `email`, `avatar`) VALUES
(19990131, 'Nguyễn Thị Diệu Linh', '123456', 'Đống Đa Hà Nội', 983545288, 'linh.nguyenthidieu@hust.edu.vn', NULL),
(20100001, 'Tạ Hải Tùng', '123456', 'Ba Đình Hà Nội', 981111288, 'tung.tahai@hust.edu.vn', NULL),
(20110003, 'Lã Thế Vinh', '123456', 'Hoàng Mai Hà Nội', 981122288, 'vinh.lathe@hust.edu.vn', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `freetime`
--
ALTER TABLE `freetime`
  ADD PRIMARY KEY (`id`),
  ADD KEY `freetime_ibfk_1` (`teacher_id`);

--
-- Indexes for table `groupstudent`
--
ALTER TABLE `groupstudent`
  ADD PRIMARY KEY (`group_id`),
  ADD KEY `FK_GS_to_Teacher` (`teacher_id`);

--
-- Indexes for table `gr_st`
--
ALTER TABLE `gr_st`
  ADD PRIMARY KEY (`group_id`,`student_id`),
  ADD KEY `student_id` (`student_id`);

--
-- Indexes for table `meeting`
--
ALTER TABLE `meeting`
  ADD PRIMARY KEY (`meeting_id`,`group_id`,`teacher_id`),
  ADD KEY `FK_MeetingID_To_GroupID` (`group_id`),
  ADD KEY `FK_TeacherID` (`teacher_id`);

--
-- Indexes for table `request_reschedule`
--
ALTER TABLE `request_reschedule`
  ADD KEY `FK_MeetingID` (`meeting_id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `request_reschedule`
--
ALTER TABLE `request_reschedule`
  ADD CONSTRAINT `FK_MeetingID` FOREIGN KEY (`meeting_id`) REFERENCES `meeting` (`meeting_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
