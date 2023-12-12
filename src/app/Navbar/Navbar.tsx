"use client";
import React, { forwardRef, useImperativeHandle, useRef, useState } from "react";
import styles from "./NavbarPage.module.scss";
import "../globals.scss";

interface NavbarProps {
	title: string;
}

const Navbar: React.FC<NavbarProps> = ({ title }) => {
	const [icon, setIcon] = useState<"view_stream" | "grid_view">("view_stream");
	const toggleIcon = () => {
		setIcon(icon === "view_stream" ? "grid_view" : "view_stream");
	};
	return (
		<div className={styles.Navbar_container}>
			<div className={styles.menu_bar}>
				<span className="material-icons icons">menu</span>
				<img src="https://www.gstatic.com/images/branding/product/2x/keep_2020q4_48dp.png" />
				<p className="keep_innerText">{title}</p>
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
				<span className="material-symbols-outlined icons" onClick={toggleIcon}>
					{icon}
				</span>
			</div>

			<div className={styles.toggle_bar}>
				<span className="material-symbols-outlined icons">apps</span>
				<span className="material-symbols-outlined icons">person</span>
			</div>
		</div>
	);
};

export default Navbar;
