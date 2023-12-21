// 메모 배경색 변경 , 닫기 누르면 메모 추가
//포커스 아웃 됐을 때에도 팔레트 없애기

import React, { useEffect, useState, useRef } from "react";
import styles from "./ColorModal.module.scss";
import Modal from "react-modal";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "reduxprops/store/store";
import BackgroundColor from "app/models/backgroundColor";
import {
	toggleColorModal,
	openAndCloseColorModal,
	closeColorModal,
} from "reduxprops/features/modal/modalSlice";

const ColorModal: React.FC = () => {
	//리액트 모달 설정
	// const isModalOpen = useSelector((state: RootState) => state.modal.isModalOpen);

	//기존 모달 설정
	const modalRef = useRef<HTMLDivElement>(null);
	const dispatch = useDispatch();
	const isModalVisible = useSelector((state: RootState) => state.modal.isColorModalVisible);

	const [selectedColor, setSelectedColor] = useState<string | null>("format_color_reset");

	const handleColorClick = (color: string) => {
		if (color === selectedColor) {
			setSelectedColor(null);
		} else {
			setSelectedColor(color);
		}
	};

	useEffect(() => {
		const handleOutsideClick = (event: MouseEvent) => {
			if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
				dispatch(closeColorModal());
			}
		};

		document.addEventListener("mousedown", handleOutsideClick);
		return () => {
			document.removeEventListener("mousedown", handleOutsideClick);
		};
	}, [dispatch]);

	return (
		<div className={isModalVisible ? styles.modal_visible : styles.modalhidden} ref={modalRef}>
			<div className={styles.modal_container}>
				{Object.entries(BackgroundColor).map(([key, value], index) => {
					if (key === "RESET_ICON") {
						const isResetSelected = selectedColor === value;
						const resetIconClass = isResetSelected
							? styles.selectedColorOption
							: styles.color_option;

						return (
							<div
								className={`material-symbols-outlined ${resetIconClass}`}
								key={index}
								onClick={() => handleColorClick(value)}
							>
								format_color_reset
								{isResetSelected && (
									<span
										className="material-symbols-outlined"
										id={styles.check_circle_null}
									>
										check
									</span>
								)}
							</div>
						);
					} else if (typeof value === "string" && value.startsWith("#")) {
						const isSelected = value === selectedColor;
						const colorOptionClass = isSelected
							? styles.selectedColorOption
							: styles.color_option;

						return (
							<div
								key={index}
								style={{ backgroundColor: value }}
								className={colorOptionClass}
								onClick={() => handleColorClick(value)}
							>
								{isSelected && (
									<span
										className="material-symbols-outlined"
										id={styles.check_circle}
									>
										check
									</span>
								)}
							</div>
						);
					}
					return null;
				})}
			</div>
		</div>
	);
};

export default ColorModal;
