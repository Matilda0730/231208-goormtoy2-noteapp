"use client";

import React, { useEffect, useState, memo, useRef } from "react";
import styles from "./Sidebar.module.scss";
import Link from "next/link";
import Navbar from "../../Navbar/Navbar";
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";

const Sidebar = () => {
	const sidebarItems = useSelector((state: RootState) => state.menu.items);

	return (
		<div className={`${styles.sidebar_space}`}>
			{sidebarItems.map((page, idx) => {
				return (
					<Link
						key={idx}
						id={styles.focus}
						href={page.link}
						className={styles.sidebar_menu}
					>
						<div className={`${styles.sidebar_icons} material-symbols-outlined`}>
							{page.iconName}
						</div>
						<span className={page.textClass}> {page.name}</span>
					</Link>
				);
			})}
		</div>
	);
};

export default Sidebar;
