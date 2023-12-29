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

	//폼제출시 새로고침 방지용 + 라벨 없으면 생성해주기
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const isLabelExists = existLabelSpace.some(
			(label) => label.name.toLowerCase() === labelSearch.toLowerCase()
		);

		if (isLabelExists) {
			// 같은 이름의 라벨이 있다면 해당 라벨을 검색해서 보여주기
		} else {
			// 같은 이름의 라벨이 없다면 새로운 라벨을 생성
			dispatch(setCreatedLabel(labelSearch));
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
		<div onClick={handleModalContainerClick} ref={modalRef}>
			<div>메모 라벨 지정</div>
			<div className={styles.modal_name_container}>
				<form onSubmit={handleSubmit} className={styles.labelAndSearches_container}>
					<input
						type="text"
						placeholder="라벨 이름 입력"
						value={labelSearch}
						onChange={handleLabelSearchChange}
						className={styles.SearchInput}
					/>
					<span className="material-symbols-outlined icons" id={styles.search_icon}>
						search
					</span>
				</form>
				<div className={styles.label_container}>
					{filteredLabels.map((label) => (
						<div key={label.id} className={styles.label_item}>
							<input
								type="checkbox"
								id={`customCheckbox-${label.id}`}
								checked={selectedLabels[label.id] || false}
								onChange={() => handleCheckboxChange(label.id)}
								className={styles.hidden_checkbox}
							/>
							<label
								htmlFor={`customCheckbox-${label.id}`}
								className={styles.custom_checkbox_label}
							>
								<span className={styles.custom_checkbox}></span>
								{label.name}
							</label>
						</div>
					))}
					<div>
						{showCreateLabelButton && (
							<div onClick={handleCreateNewLabel}>{labelSearch} 라벨 만들기</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default MemoLabelModal;
