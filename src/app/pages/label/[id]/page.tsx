"use client";
import React from "react";
import styles from "./labelPage.module.scss";
import { useSelector } from "react-redux";
import CreateMemo from "@components/CreateMemo/CreateMemo";
import { RootState } from "reduxprops/store/store";

const LabelPage = () => {
	const isNone = useSelector((state: RootState) => state.sidebar.isNone);
	return (
		<div className={styles.pageBody}>
			<div className={styles.main_body}>
				<CreateMemo />
				{isNone ? (
					<div className={styles.explanation}>
						<div className={`${styles.first_icon} material-symbols-outlined`}>
							label
						</div>
						<span className={styles.first_text}>이 라벨이 지정된 메모가 없습니다.</span>
					</div>
				) : null}
			</div>
		</div>
	);
};

export default LabelPage;
