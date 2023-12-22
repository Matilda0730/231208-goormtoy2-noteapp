import React from "react";
import Modal from "react-modal";
import styles from "./MemoLabelModal.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "reduxprops/store/store";
import {
	handleCloseModal,
	toggleMemoLabelModal,
	handleOpenConfirmModal,
} from "reduxprops/features/modal/modalSlice";

const MemoLabelModal = () => {
	const dispatch = useDispatch();
	const isModalOpen = useSelector((state: RootState) => state.modal.memoLabelModalToggle);
	const handleClose = () => {
		dispatch(toggleMemoLabelModal());
	};

	// 모달 컨테이너에 대한 클릭 핸들러
	const handleModalContainerClick = (event: React.MouseEvent) => {
		event.stopPropagation(); // 버블링 중지
	};

	const customStyles = {
		overlay: {
			backgroundColor: "",
			zIndex: 1,
		},
	};

	return (
		<div onClick={handleModalContainerClick} className={styles.laberModal_container}>
			<div>메모 라벨 지정</div>
			<div className={styles.modal_name_container}>
				<input type="text" placeholder="라벨 이름 입력" />
				<span className="material-symbols-outlined icons" id={styles.search_icon}>
					search
				</span>
			</div>
		</div>
	);
};

export default MemoLabelModal;
