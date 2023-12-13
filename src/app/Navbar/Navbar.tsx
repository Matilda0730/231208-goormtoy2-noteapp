"use client";
import React, { forwardRef, useImperativeHandle, useRef, useState } from "react";
import styles from "./NavbarPage.module.scss";
import "../globals.scss";
import { toggleIcon, toggleSidebar } from "../../redux/features/navbar/navbarSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const Navbar: React.FC = () => {
	const dispatch = useDispatch();
	const icon = useSelector((state: RootState) => state.navbar.icon);
	const isSidebarOpen = useSelector((state: RootState) => state.navbar.isSidebarOpen);

	return (
		<div className={styles.Navbar_container}>
			<div className={styles.menu_bar}>
				<span
					onClick={() => dispatch(toggleIcon())}
					className="material-symbols-outlined icons"
				>
					menu
				</span>
				<img
					src="https://www.gstatic.com/images/branding/product/2x/keep_2020q4_48dp.png"
					alt="menu"
				></img>
				<p>Keep</p>
			</div>

			<div className={styles.search_bar}>
				<div className={styles.search_wrapper}>
					<span className="material-symbols-outlined icons" id={styles.search_icon}>
						search
					</span>
					<input className={styles.search_input} type="text" placeholder="Search" />
				</div>
			</div>

			<div className={styles.option_bar}>
				<span className="material-symbols-outlined icons">refresh</span>
				<span className="material-symbols-outlined icons">settings</span>
				<span
					className="material-symbols-outlined icons"
					onClick={() => dispatch(toggleIcon())}
				>
					{icon}
				</span>
			</div>

			<div className={styles.toggle_bar}>
				<span className="material-symbols-outlined icons">apps</span>
			</div>
		</div>
	);
};

export default Navbar;
