import React from "react";
import Modal from "react-modal";
import styles from "./MemoLabelModal.module.scss";

const MemoLabelModal = () => {
	return (
		<Modal isOpen={true} className={styles.modal_container}>
			모달입니다.
		</Modal>
	);
};

export default MemoLabelModal;
