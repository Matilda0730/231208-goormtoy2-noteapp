// 메모 배경색 변경 , 닫기 누르면 메모 추가

import React, { useState } from "react";
import styles from "./ColorModal.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "reduxprops/store/store";
import BackgroundColor from "app/models/backgroundColor";

const ColorModal: React.FC = () => {
	const isModalVisible = useSelector((state: RootState) => state.modal.isColorModalVisible);
	const [selectedColor, setSelectedColor] = useState<string | null>("format_color_reset");

	const handleColorClick = (color: string) => {
		if (color === selectedColor) {
			setSelectedColor(null);
		} else {
			setSelectedColor(color);
		}
	};

	return (
		<div className={isModalVisible ? styles.modal_visible : styles.modalhidden}>
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
