import React, { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import styles from "./MemoLabelModal.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "reduxprops/store/store";
import {
	handleCloseModal,
	toggleMemoLabelModal,
	handleOpenConfirmModal,
} from "reduxprops/features/modal/modalSlice";

import { setCreatedLabel } from "reduxprops/features/menu/menuSlice";

const MemoLabelModal = () => {
	const dispatch = useDispatch();
	//모달 참조 생성
	const modalRef = useRef<HTMLDivElement>(null);
	const [labelSearch, setLabelSearch] = useState(""); // 라벨 검색을 위한 상태
	const existLabelSpace = useSelector((state: RootState) => state.menu.newLabelSpace);
	const [selectedLabels, setSelectedLabels] = useState<{ [key: string]: boolean }>({}); // 선택된 라벨 상태
	const isLabelModalOpen = useSelector((state: RootState) => state.modal.memoLabelModalToggle);
	const handleCloseFromOutside = () => {
		if (isLabelModalOpen) {
			dispatch(toggleMemoLabelModal());
		}
	};

	// 라벨 검색 핸들러(onchange에 연결)
	const handleLabelSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setLabelSearch(event.target.value);
	};

	const handleCheckboxChange = (labelId: string) => {
		setSelectedLabels({
			...selectedLabels,
			[labelId]: !selectedLabels[labelId],
		});
	};

	// 필터링된 라벨 목록
	const filteredLabels = existLabelSpace.filter((label) =>
		label.name.toLowerCase().includes(labelSearch.toLowerCase())
	);

	// 라벨 생성 버튼 표시 여부 확인
	const showCreateLabelButton = labelSearch && !filteredLabels.length;

	const handleCreateNewLabel = () => {
		// 라벨 생성 로직 (Redux 액션 디스패치)
		dispatch(setCreatedLabel(labelSearch));
	};

	// 완전히 일치하는 라벨이 없는지 확인
	const isLabelExists = existLabelSpace.some(
		(label) => label.name.toLowerCase() === labelSearch.toLowerCase()
	);

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
			className={styles.labelModal_container}
			ref={modalRef}
		>
			<div>메모 라벨 지정</div>
			<div className={styles.modal_name_container}>
				<div className={styles.labelAndSearches_container}>
					<input
						type="text"
						placeholder="라벨 이름 입력"
						value={labelSearch}
						onChange={handleLabelSearchChange}
					/>
					<span className="material-symbols-outlined icons" id={styles.search_icon}>
						search
					</span>
				</div>
				<div className={styles.label_container}>
					{filteredLabels.map((label) => (
						<div key={label.id} className={styles.label_item}>
							<input
								type="checkbox"
								checked={selectedLabels[label.id] || false}
								onChange={() => handleCheckboxChange(label.id)}
							/>
							{label.name}
						</div>
					))}
					<div>
						{showCreateLabelButton && (
							<div
								onClick={handleCreateNewLabel}
								className={styles.create_label_button}
							>
								{labelSearch} 라벨 만들기
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default MemoLabelModal;
