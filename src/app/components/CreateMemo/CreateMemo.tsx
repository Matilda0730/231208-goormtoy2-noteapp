import React, { useState, useEffect, useRef, ChangeEvent, MouseEvent } from "react";
import styles from "./CreateMemo.module.scss";
import ColorModal from "./ColorModal";
import { togglePaletteModal } from "reduxprops/features/modal/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "reduxprops/store/store";
import MemoLabelModal from "./MemoLabelModal";

const CreateMemo = () => {
	const isModalVisible = useSelector((state: RootState) => state.modal.paletteModalToggle);
	const dispatch = useDispatch();
	const [isVisible, setIsVisible] = useState<boolean>(false);
	const createSpaceRef = useRef<HTMLDivElement>(null);
	const [text, setText] = useState<string>("");
	const [title, setTitle] = useState<string>("");
	const titleTextareaRef = useRef<HTMLTextAreaElement>(null);
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	const selectedColor = useSelector((state: RootState) => state.modal.modalBackgroundColor);

	// `RESET_ICON` 키가 선택되었을 때의 기본 배경색
	const defaultBackgroundColor = "#232427";

	// 실제로 적용할 배경색을 결정
	const backgroundColor = selectedColor ?? defaultBackgroundColor;

	const handleToggleModal = () => {
		dispatch(togglePaletteModal());
	};

	const handleMemoClick = (event: MouseEvent<HTMLDivElement>) => {
		event.stopPropagation();
	};

	const handleMemoClickHTML = (event: MouseEvent<HTMLTextAreaElement>) => {
		event.stopPropagation();
	};

	useEffect(() => {
		const adjustHeight = (textarea: HTMLTextAreaElement | null) => {
			if (textarea) {
				textarea.style.height = "auto";
				textarea.style.height = textarea.scrollHeight + "px";
			}
		};

		adjustHeight(titleTextareaRef.current);
		adjustHeight(textareaRef.current);
	}, [text]);

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isModalVisible]);

	const handleChangeTitle = (event: ChangeEvent<HTMLTextAreaElement>) => {
		setTitle(event.target.value);
	};

	const handleChangeText = (event: ChangeEvent<HTMLTextAreaElement>) => {
		setText(event.target.value);
	};

	const consoleLog = () => {
		console.log("Title:", title);
		console.log("Text:", text);
		setIsVisible(false);
	};

	const handleClickOutside = (event: globalThis.MouseEvent) => {
		if (createSpaceRef.current && !createSpaceRef.current.contains(event.target as Node)) {
			setIsVisible(false); // CreateMemo 닫기
			if (isModalVisible) {
				dispatch(togglePaletteModal()); // ColorModal 닫기
			}
		}
	};

	return (
		<>
			{isVisible ? (
				<>
					<div
						className={styles.create_space_click}
						onClick={handleMemoClick}
						ref={createSpaceRef}
						style={{ backgroundColor: backgroundColor }}
					>
						<form>
							<div className={styles.create_title_container}>
								<textarea
									ref={titleTextareaRef}
									className={styles.create_space_title}
									placeholder="제목"
									onChange={handleChangeTitle}
									onClick={handleMemoClickHTML}
									style={{ backgroundColor: backgroundColor }}
								/>
								<div className={`material-symbols-outlined`}>push_pin</div>
							</div>
							<textarea
								ref={textareaRef}
								className={styles.create_space_text}
								placeholder="메모 작성..."
								onChange={handleChangeText}
								onClick={handleMemoClickHTML}
								style={{ backgroundColor: backgroundColor }}
							/>
						</form>
						<div className={styles.button_and_close_container}>
							<div
								className={styles.button_container}
								style={{ backgroundColor: backgroundColor }}
							>
								<div className={`material-symbols-outlined`}>add_alert</div>
								<div
									className={`material-symbols-outlined`}
									id="palette"
									onClick={handleToggleModal}
								>
									palette
								</div>

								<div className={`material-symbols-outlined`}>archive</div>
								<div className={`material-symbols-outlined`}>label</div>
							</div>
							<div className={styles.button_close} onClick={consoleLog}>
								닫기
							</div>
						</div>
						<ColorModal />
						<MemoLabelModal />
					</div>
				</>
			) : (
				<>
					<div
						className={styles.create_space}
						onClick={() => setIsVisible(!isVisible)}
						ref={createSpaceRef}
						style={{ backgroundColor: backgroundColor }}
					>
						<div className={styles.create_space_inner}>메모작성...</div>
						<div className={`material-symbols-outlined`}>check_box</div>
						<div className={`material-symbols-outlined`}>label</div>
						<div className={`material-symbols-outlined`}>more_horiz</div>
					</div>
				</>
			)}
		</>
	);
};

export default CreateMemo;
