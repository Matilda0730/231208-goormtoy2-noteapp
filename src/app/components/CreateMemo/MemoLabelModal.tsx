import React, { useEffect, useRef } from "react";
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
	//모달 참조 생성
	const modalRef = useRef<HTMLDivElement>(null);
	const isLabelModalOpen = useSelector((state: RootState) => state.modal.memoLabelModalToggle);
	const handleCloseFromOutside = () => {
		if (isLabelModalOpen) {
			dispatch(toggleMemoLabelModal());
		}
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				modalRef.current &&
				!modalRef.current.contains(event.target as Node) &&
				isLabelModalOpen
			) {
				handleCloseFromOutside();
			}
		};

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				handleCloseFromOutside();
			}
		};

		if (isLabelModalOpen) {
			document.addEventListener("click", handleClickOutside);
			document.addEventListener("keydown", handleKeyDown);
		}

		return () => {
			document.removeEventListener("click", handleClickOutside);
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [isLabelModalOpen]);

	//라벨 뿌려주기 위해서 선택해오기
	const newLabelSpace = useSelector((state: RootState) => state.menu.newLabelSpace);

	// 모달 컨테이너에 대한 클릭 핸들러
	const handleModalContainerClick = (event: React.MouseEvent) => {
		event.stopPropagation(); // 버블링 중지
	};

	return (
		<div
			onClick={handleModalContainerClick}
			className={styles.laberModal_container}
			ref={modalRef}
		>
			<div>메모 라벨 지정</div>
			<div className={styles.modal_name_container}>
				<input type="text" placeholder="라벨 이름 입력" />
				<span className="material-symbols-outlined icons" id={styles.search_icon}>
					search
				</span>
				<div className={styles.label_container}>
					{newLabelSpace.map((label) => (
						<div key={label.id} className={styles.label_item}>
							{label.name}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default MemoLabelModal;
