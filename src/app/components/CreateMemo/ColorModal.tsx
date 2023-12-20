import React from "react";
import styles from "./ColorModal.module.scss";
import { toggleColorModal } from "reduxprops/features/modal/modalSlice";
import { useSelector } from "react-redux";
import { RootState } from "reduxprops/store/store";
import BackgroundColor from "app/models/backgroundColor";

const ColorModal: React.FC = () => {
	const isModalVisible = useSelector((state: RootState) => state.modal.isColorModalVisible);

	return (
		<div className={isModalVisible ? `${styles.modal_visible}` : styles.modalhidden}>
			<div className={styles.modal_container}>
				{Object.values(BackgroundColor).map((colorCode) => (
					<div
						key={colorCode}
						style={{ backgroundColor: colorCode }}
						className={styles.color_option}
					></div>
				))}
			</div>
		</div>
	);
};

export default ColorModal;
