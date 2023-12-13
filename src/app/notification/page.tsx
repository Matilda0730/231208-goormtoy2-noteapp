"use client";
import React, { useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import CreateMemo from "../components/CreateMemo/CreateMemo";
import styles from "./notification.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const Notification = () => {
	const isNone = useSelector((state: RootState) => state.sidebar.isNone);
	return (
		<div className={styles.pageBody}>
			<div className={styles.main_body}>
				<CreateMemo />
				{isNone ? (
					<div className={styles.explanation}>
						<div className={`${styles.first_icon} material-symbols-outlined`}>
							notifications
						</div>
						<span className={styles.first_text}>
							예정된 알림의 메모가 여기에 표시됩니다.
						</span>
					</div>
				) : null}
			</div>
		</div>
	);
};

export default Notification;
