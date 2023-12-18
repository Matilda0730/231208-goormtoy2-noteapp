import React, { useState, useEffect, useRef } from "react";
import styles from "./CreateMemo.module.scss";

const CreateMemo = () => {
	const [isVisible, setIsVisible] = useState(false);
	const createSpaceRef = useRef<HTMLDivElement>(null);

	const handleClickOutside = (event: MouseEvent) => {
		if (createSpaceRef.current && !createSpaceRef.current.contains(event.target as Node)) {
			setIsVisible(false);
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<>
			<div
				className={styles.create_space}
				onClick={() => setIsVisible(!isVisible)}
				ref={createSpaceRef}
			>
				{isVisible ? (
					<>
						<div>제목</div>
						<div>내용</div>
					</>
				) : (
					<>
						<div className={styles.create_space_inner}>메모작성...</div>
						<div className={`material-symbols-outlined`}>check_box</div>
						<div className={`material-symbols-outlined`}>label</div>
						<div className={`material-symbols-outlined`}>more_horiz</div>
					</>
				)}
			</div>
		</>
	);
};

export default CreateMemo;
