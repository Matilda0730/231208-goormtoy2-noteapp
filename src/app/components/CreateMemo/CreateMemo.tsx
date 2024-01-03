"use client";
import React, {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  MouseEvent,
} from "react";
import styles from "./CreateMemo.module.scss";
import ColorModal from "./ColorModal";
import {
  togglePaletteModal,
  toggleMemoLabelModal,
  CloseMemoLabelModal,
  setBackgroundColor,
} from "reduxprops/features/modal/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "reduxprops/store/store";
import MemoLabelModal from "./MemoLabelModal";
import { addNote } from "reduxprops/features/memo/notesSlice";
import { Note } from "app/models/note";
import BackgroundColor from "app/models/backgroundColor";
import { v4 as uuidv4 } from "uuid";

const CreateMemo = () => {
  const isModalVisible = useSelector(
    (state: RootState) => state.modal.paletteModalToggle
  );
  // const [isLabelModalVisible, setIsLabelModalVisible] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const createSpaceRef = useRef<HTMLDivElement>(null);
  const [text, setText] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const titleTextareaRef = useRef<HTMLTextAreaElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const memoLabelModalRef = useRef<HTMLDivElement>(null);
  const ColorModalRef = useRef<HTMLDivElement>(null);
  const defaultBackgroundColor = "#202124";
  const currentBackgroundColor = useSelector(
    (state: RootState) => state.modal.modalBackgroundColor
  );
  //"label" 아이콘을 클릭했을 때 isLabelModalVisible 상태를 토글하는 핸들러에 연결
  const isLabelModalVisible = useSelector(
    (state: RootState) => state.modal.memoLabelModalToggle
  );

  const handleToggleLabelModal = () => {
    dispatch(toggleMemoLabelModal());
  };

  // 실제로 적용할 배경색을 결정
  const backgroundColor = useSelector(
    (state: RootState) => state.modal.modalBackgroundColor
  );
  const defaultColor = "#202124"; // 초기 색상

  const handleToggleModal = () => {
    dispatch(togglePaletteModal());
  };

  //memo공간안쪽 부분을 눌렀을 때 안 닫히게 하는 기능
  const handleMemoClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };
  //안쪽 부분을 눌렀을 때 안 닫히게 하는 기능2
  const handleMemoClickHTML = (event: MouseEvent<HTMLTextAreaElement>) => {
    event.stopPropagation();
  };
  //바깥으로 뺀 모달 클릭했을 때 안 닫히게 하는 기능 3
  const handleModalClick = (event: React.MouseEvent) => {
    event.stopPropagation(); // 상위 컴포넌트로의 이벤트 전파를 방지
  };

  //textarea 입력하면 길어지는 기능

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

  //Create memo modal window close
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

  //메모창 textarea에 입력한 거 (title,text) 메모 생성 .닫기에 연결돼 있음
  const createMemoAndSetTitleText = () => {
    const currentTime = new Date().getTime();

    const newNote: Note = {
      id: uuidv4(),
      title: title,
      text: text,
      tags: null,
      backgroundColor: currentBackgroundColor,
      isPinned: false,
      isRead: false,
      createdTime: currentTime,
      editedTime: null,
    };

    dispatch(addNote(newNote));

    setIsVisible(false);
    setTitle(""); // 제목 초기화
    setText(""); // 내용 초기화
  };

  //모달 바깥 클릭하면
  const handleClickOutside = (event: globalThis.MouseEvent) => {
    if (
      createSpaceRef.current &&
      !createSpaceRef.current.contains(event.target as Node) &&
      (!memoLabelModalRef.current ||
        !memoLabelModalRef.current.contains(event.target as Node)) &&
      (!ColorModalRef.current ||
        !ColorModalRef.current.contains(event.target as Node))
    ) {
      setIsVisible(false); // CreateMemo 닫기
      if (isModalVisible) {
        dispatch(togglePaletteModal()); // ColorModal 닫기
      }
    }
  };

  useEffect(() => {
    if (isVisible) {
      // CreateMemo가 열릴 때 MemoLabelModal 상태를 false로 설정
      dispatch(CloseMemoLabelModal(false));
    }
  }, [isVisible, dispatch]);

  // CreateMemo가 닫힐 때 배경색을 리셋하는 useEffect
  useEffect(() => {
    if (!isVisible) {
      dispatch(setBackgroundColor(defaultBackgroundColor));
    }
  }, [isVisible, dispatch]);

  return (
    <>
      {isVisible ? (
        <>
          <div
            className={styles.create_space_click}
            onClick={handleMemoClick}
            ref={createSpaceRef}
            style={{ backgroundColor: backgroundColor || defaultColor }}
          >
            <form>
              <div className={styles.create_title_container}>
                <textarea
                  ref={titleTextareaRef}
                  className={styles.create_space_title}
                  placeholder="제목"
                  onChange={handleChangeTitle}
                  onClick={handleMemoClickHTML}
                  style={{ backgroundColor: backgroundColor || defaultColor }}
                />
                <div className={`material-symbols-outlined`}>push_pin</div>
              </div>
              <textarea
                autoFocus
                ref={textareaRef}
                className={styles.create_space_text}
                placeholder="메모 작성..."
                onChange={handleChangeText}
                onClick={handleMemoClickHTML}
                style={{ backgroundColor: backgroundColor || defaultColor }}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    createMemoAndSetTitleText();
                  }
                }}
              />
            </form>
            <div className={styles.button_and_close_container}>
              <div
                className={styles.button_container}
                style={{ backgroundColor: backgroundColor || defaultColor }}
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
                <div
                  className={`material-symbols-outlined`}
                  onClick={handleToggleLabelModal}
                >
                  label
                </div>
              </div>
              <div
                className={styles.button_close}
                onClick={createMemoAndSetTitleText}
              >
                닫기
              </div>
            </div>
          </div>
          <div ref={ColorModalRef} onClick={handleModalClick}>
            {<ColorModal />}
          </div>

          {isLabelModalVisible && (
            <div
              ref={memoLabelModalRef}
              onClick={handleModalClick}
              className={styles.labelModal_container}
            >
              {<MemoLabelModal />}
            </div>
          )}
        </>
      ) : (
        <>
          <div
            className={styles.create_space}
            onClick={() => setIsVisible(!isVisible)}
            ref={createSpaceRef}
            style={{ backgroundColor: defaultColor }}
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
