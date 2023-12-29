import React, { useEffect, useState, useRef } from "react";
import styles from "./ColorModal.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "reduxprops/store/store";
import BackgroundColor from "app/models/backgroundColor";
import { togglePaletteModal, setBackgroundColor } from "reduxprops/features/modal/modalSlice";

const ColorModal: React.FC = () => {
	const modalRef = useRef<HTMLDivElement>(null);
	const dispatch = useDispatch();
	const isModalVisible = useSelector((state: RootState) => state.modal.paletteModalToggle);
	const [selectedColor, setSelectedColor] = useState<string | null>("format_color_reset");

	const handleModalContainerClick = (event: React.MouseEvent) => {
		event.stopPropagation(); // 버블링 중지
	};

	// 색상 물어보고 초기 색상으로 설정

	const handleColorClick = (color: string, event: React.MouseEvent) => {
		event.stopPropagation();
		// "format_color_reset" 아이콘이 클릭되면 selectedColor를 null로 설정
		const colorValue = color === "format_color_reset" ? null : color;
		setSelectedColor(colorValue);
		// 배경색 "format_color_reset"인 경우 기본 색상
		const backgroundColor = color === "format_color_reset" ? "#202124" : color;
		dispatch(setBackgroundColor(backgroundColor));
	};

	useEffect(() => {
		if (isModalVisible) {
			setSelectedColor("format_color_reset");
		}
	}, [isModalVisible]);

	//▼onRequestClose를 직접 구현
	const handleCloseFromOutside = () => {
		if (isModalVisible) {
			dispatch(togglePaletteModal());
		}
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				modalRef.current &&
				!modalRef.current.contains(event.target as Node) &&
				isModalVisible
			) {
				handleCloseFromOutside();
			}
		};

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				handleCloseFromOutside();
			}
		};

		if (isModalVisible) {
			document.addEventListener("click", handleClickOutside);
			document.addEventListener("keydown", handleKeyDown);
		}

		return () => {
			document.removeEventListener("click", handleClickOutside);
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [isModalVisible]);

	return (
		<div
			className={isModalVisible ? styles.modal_visible : styles.modalhidden}
			ref={modalRef}
			onClick={handleModalContainerClick}
		>
			<div className={styles.modal_container}>
				{Object.entries(BackgroundColor).map(([key, value], index) => {
					if (key === "RESET_ICON") {
						// selectedColor가 "format_color_reset"과 동일한지 확인
						const isResetSelected = selectedColor === "format_color_reset";
						const resetIconClass = isResetSelected
							? styles.selectedColorOption
							: styles.color_option;

						return (
							<div
								className={`material-symbols-outlined ${resetIconClass}`}
								key={index}
								onClick={(e) => handleColorClick(value, e)}
								style={{ color: "white" }}
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
								onClick={(e) => handleColorClick(value, e)}
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
