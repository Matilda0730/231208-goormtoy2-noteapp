"use client";
import React from "react";
import { Note } from "app/models/note";
import styles from "./MemosDisplay.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "reduxprops/store/store";

interface MemosDisplayProps {
	memos: Note[];
}

const MemosDisplay = () => {
	const memos = useSelector((state: RootState) => state.notes.notes);

	return (
		<div>
			{memos.length > 0 ? (
				memos.map((memo) => (
					<div
						key={memo.id}
						className={styles.memoContainer}
						style={{ backgroundColor: memo.backgroundColor }}
					>
						<div key={memo.id} className={styles.memo}>
							<h3>{memo.title}</h3>
							<p>{memo.text}</p>
						</div>
					</div>
				))
			) : (
				<div className={styles.explanation}>
					<div className={`${styles.first_icon} material-symbols-outlined`}>
						lightbulb
					</div>
					<span className={styles.first_text}>추가한 메모가 여기에 표시됩니다.</span>
				</div>
			)}
		</div>
	);
};

export default MemosDisplay;
