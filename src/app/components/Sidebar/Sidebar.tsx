"use client";
import React, { useRef } from "react";
import styles from "./Sidebar.module.scss";
import Link from "next/link";
import Navbar from "../../Navbar/Navbar";

interface SidebarProps {
	sidebarItems: { name: string; iconName: string; link: string; textClass: string }[];
}

const Sidebar: React.FC<SidebarProps> = ({ onItemClick }) => {
	const sidebarItems = [
		{
			name: "메모",
			iconName: "lightbulb",
			link: "/",
			textClass: styles.memo_text,
		},
		{
			name: "알림",
			iconName: "notifications",
			link: "/",
			textClass: styles.notification_text,
		},
		{
			name: "라벨 수정",
			iconName: "edit",
			link: "/",
			textClass: styles.editLabel_text,
		},
		{
			name: "보관처리",
			iconName: "archive",
			link: "/",
			textClass: styles.archiveProcessing_text,
		},
		{
			name: "휴지통",
			iconName: "delete",
			link: "/",
			textClass: styles.trashCan_text,
		},
	];

	return (
		<div className={styles.sidebar_space}>
			{sidebarItems.map((item, index) => (
				<div
					key={index}
					className={styles.sidebar_menu}
					onClick={() => onItemClick(item.name)}
				>
					<div className={`${styles.sidebar_icons} material-symbols-outlined`}>
						{item.iconName}
					</div>
					<span className={item.textClass}>{item.name}</span>
				</div>
			))}
		</div>
	);
};

export default Sidebar;
