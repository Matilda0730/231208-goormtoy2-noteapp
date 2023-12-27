"use client";
import React, { useEffect } from "react";
import styles from "./NavbarPage.module.scss";
import "../../globals.scss";
import { usePathname, useRouter, redirect } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "reduxprops/store/store";
import { toggleSidebar } from "@slice/sidebar/sidebarSlice";
import { toggleIcon } from "@slice/navbar/navbarSlice";

const Navbar: React.FC = () => {
	const navigate = useRouter();
	const labelToDelete = useSelector((state: RootState) => state.menu.labelToDelete);
	const selectedItemName = useSelector((state: RootState) => state.menu.selectedItem);
	const dispatch = useDispatch();
	const icon = useSelector((state: RootState) => state.navbar.icon);
	const isSidebarOpen = useSelector((state: RootState) => state.sidebar.isSidebarOpen);
	const pathname = usePathname() || "/";
	const getPageName = () => {
		if (pathname === "/") {
			// "Keep"일 경우 이미지와 텍스트 반환
			return (
				<>
					<img
						src="https://www.gstatic.com/images/branding/product/2x/keep_2020q4_48dp.png"
						alt="Keep"
					/>
					<p>Keep</p>
				</>
			);
		} else if (pathname === "/pages/notification") {
			return <p className={styles.classP}>알림</p>;
		} else if (pathname === "/pages/archiveProcessing") {
			return <p className={styles.classP}>보관처리</p>;
		} else if (pathname === "/pages/trashCan") {
			return <p className={styles.classP}>휴지통</p>;
		} else if (pathname.startsWith("/pages/label/")) {
			const encodedLabelName = pathname.split("/")[3];
			const labelName = decodeURIComponent(encodedLabelName);
			return <p className={styles.classP}>{labelName}</p>;
		}
		return <p>Keep</p>;
	};

	// useEffect(() => {
	// 	// 현재 경로가 삭제될 라벨의 경로와 일치하는지 확인
	// 	if (labelToDelete && pathname === `/pages/label/${labelToDelete}`) {
	// 		redirect("/"); // 삭제된 라벨 페이지에 있을 때 메인 페이지로 리디렉션
	// 	}
	// }, [labelToDelete, pathname]);

	return (
		<div className={styles.Navbar_container}>
			<div className={styles.menu_bar}>
				<div className={styles.menu_bar_icon}>
					<span
						onClick={() => {
							dispatch(toggleSidebar());
						}}
						className="material-symbols-outlined icons"
					>
						menu
					</span>
				</div>
				<div className={styles.keep_and_name}>
					{getPageName()} :{<div className={styles.img_div}></div>}
				</div>
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
				<span className="material-symbols-outlined icons">person</span>
			</div>
		</div>
	);
};

export default Navbar;
