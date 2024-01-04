"use client";
import React, { useEffect } from "react";
import styles from "./labelPage.module.scss";
import { useDispatch, useSelector } from "react-redux";
import CreateMemo from "@components/CreateMemo/CreateMemo";
import MemosDisplay from "@components/CreateMemo/MemosDisplay";
import { RootState } from "reduxprops/store/store";
import { setLabelMemos } from "reduxprops/features/menu/menuSlice";

const LabelPage = () => {
	const dispatch = useDispatch();
	const selectedLabelId = useSelector((state: RootState) => state.menu.selectedLabelId);
	const allMemos = useSelector((state: RootState) => state.notes.notes);

	useEffect(() => {
		if (selectedLabelId) {
			// 필터링 로직: selectedLabelId에 맞는 메모들을 필터링
			const filteredMemos = allMemos.filter(
				(memo) => memo.tags && memo.tags.some((tag) => tag.id === selectedLabelId) // memo.tags가 null이 아닐 때만 필터링
			);
			dispatch(setLabelMemos(filteredMemos));
		}
	}, [selectedLabelId, allMemos, dispatch]);

	const labelMemos = useSelector((state: RootState) => state.menu.labelMemos);
	const isNone = labelMemos.length === 0;

	return (
		<div className={styles.main_body}>
			<CreateMemo />
			{!isNone ? (
				<MemosDisplay />
			) : (
				<div className={styles.explanation}>
					<div className={`${styles.first_icon} material-symbols-outlined`}>label</div>
					<span className={styles.first_text}>이 라벨이 지정된 메모가 없습니다.</span>
				</div>
			)}
		</div>
	);
};

export default LabelPage;
