-- phpMyAdmin SQL Dump
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th2 13, 2023 lúc 10:34 AM
-- Phiên bản máy phục vụ: 10.4.27-MariaDB
-- Phiên bản PHP: 8.2.0
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";
-- Tạo database
CREATE DATABASE PROJECT_II
--
-- Cấu trúc bảng `teacher`
--
CREATE TABLE `teacher`(
	`teacher_id` int(8) NOT NULL,
    `phonenumber` int (12) NOT NULL,
    `address` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
    `password` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
    `email` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
    `fullname` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;
--
-- Cấu trúc bảng `sinh vien`
--
CREATE TABLE `student`(
	`student_id` int(8) NOT NULL,
    `group_id` int(8) NOT NULL,
    `phonenumber` int (12) NOT NULL,
    `password` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
    `email` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
    `fullname` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
    `projectname` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
    `coursecode` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;
--
-- Cấu trúc bảng `group`
--
CREATE TABLE `group`(
	`group_id` int(8) NOT NULL
)
--
-- Cấu trúc bảng `metting`
--
CREATE TABLE `metting`(
    `group_id` int(8) NOT NULL,
    `teacher_id` int(8) NOT NULL,
	`metting_id` int(8) NOT NULL,
    `date` DATE DEFAULT NULL,
    `reportdeadline` DATE DEFAULT NULL,
    `note` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
    `next_metting_id` int(8) NOT NULL,
  	`report` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;
