"use client";
import React, { useEffect, useState, MouseEvent } from "react";
import { Note } from "app/models/note";
import styles from "./MemosDisplay.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "reduxprops/store/store";
import {
  handleCloseNoteModal,
  handleOpenNoteModal,
  togglePaletteModal,
} from "@slice/modal/modalSlice";
import ColorModal from "./ColorModal";
import {
  actualPinToggle,
  moveToArchive,
  moveToTrashCan,
} from "@slice/memo/notesSlice";
import NoteModal from "@components/ModalState/NoteModal/NoteModal";
import { setSelectedMemoId } from "@slice/menu/menuSlice";
import { usePathname, useRouter } from "next/navigation"

const MemosDisplay = () => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const allMemos = useSelector((state: RootState) => state.notes.notes);
  const selectedLabelId = useSelector(
    (state: RootState) => state.menu.selectedLabelId
  );
  const labels = useSelector((state: RootState) => state.menu.newLabelSpace);

  const [pinnedFilteredMemos, setPinnedFilteredMemos] = useState<Note[]>([]);
  const [normalFilteredMemos, setNormalFilteredMemos] = useState<Note[]>([]);

  useEffect(() => {
    let filteredMemos;
    // 선택된 라벨 ID에 따라 메모 필터링
    if (pathname === '/') {
      filteredMemos = allMemos;
    } else {
      filteredMemos = selectedLabelId
        ? allMemos.filter(memo =>
            memo.tags?.some(tag => tag.id === selectedLabelId))
        : allMemos;
    }
    // 고정된 메모와 일반 메모로 분류
    const pinnedMemos = filteredMemos.filter((memo) => memo.isPinned);
    const normalMemos = filteredMemos.filter((memo) => !memo.isPinned);
  
    // 상태 업데이트
    setPinnedFilteredMemos(pinnedMemos);
    setNormalFilteredMemos(normalMemos);
  }, [selectedLabelId, allMemos, pathname]);


  const memos = useSelector((state: RootState) => state.notes.notes);

  const pinnedNotes = memos.filter((notes) => notes.isPinned);
  const normalNotes = memos.filter((notes) => !notes.isPinned);

  const pinToggle = (
    memoId: string,
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    event.stopPropagation();
    dispatch(actualPinToggle(memoId));
  };

  const mapElements = (data: Note[]) => {
    return data.map((memo) => (
      <div
        key={memo.id}
        className={styles.memoContainer}
        style={{ backgroundColor: memo.backgroundColor }}
      >
        <div
          key={memo.id}
          className={styles.memo}
          onClick={() => {
            dispatch(handleOpenNoteModal());
            dispatch(setSelectedMemoId(memo.id));
          }}
        >
          <h3 style={{ marginBottom: "10px" }}>{memo.title}</h3>
          <p style={{ whiteSpace: "pre-wrap" }}>{memo.text}</p>
          <div
            id={styles.push_pin}
            className={`${
              memo.isPinned ? `material-icons` : `material-symbols-outlined`
            }`}
            onClick={(event) => {
              pinToggle(memo.id, event);
            }}
          >
            push_pin
          </div>
        </div>
        <div className={styles.labels_container}>
          {memo.tags &&
            memo.tags.map((label, index) => (
              <span key={index} className={styles.label}>
                {label.name}
              </span>
            ))}
        </div>
        <div className={styles.memoButton_space}>
          <div id={styles.bottom_icons} className={`material-symbols-outlined`}>
            add_alert
          </div>
          <div
            id={styles.bottom_icons}
            className={`material-symbols-outlined`}
            // onClick={handleToggleModal}
          >
            palette
          </div>
          <div
            id={styles.bottom_icons}
            className={`material-symbols-outlined`}
            onClick={() => {
              dispatch(moveToArchive(memo));
            }}
          >
            archive
          </div>
          <div
            id={styles.bottom_icons}
            className={`material-symbols-outlined`}
            // onClick={handleToggleLabelModal}
          >
            label
          </div>
          <div
            id={styles.bottom_icons}
            className={`material-symbols-outlined`}
            onClick={() => {
              dispatch(moveToTrashCan(memo));
            }}
          >
            delete
          </div>
        </div>
        {/* <ColorModal /> */}
      </div>
    ));
  };

  return (
    <>
    <div className={styles.memo_space}>
      {pinnedFilteredMemos.length > 0 || normalFilteredMemos.length > 0 ? (
        <>
          {pinnedFilteredMemos.length > 0 && (
            <div className={styles.pinSituation}>
              <div className={styles.standsText}>고정됨</div>
              <div className={styles.Notes_space}>
                {mapElements(pinnedFilteredMemos)}
              </div>
            </div>
          )}

          {normalFilteredMemos.length > 0 && (
            <div>
              {pinnedFilteredMemos.length > 0 && (
                <div className={styles.standsText}>기타</div>
              )}
              <div className={styles.Notes_space}>
                {mapElements(normalFilteredMemos)}
                </div>
        </div>
      )}
    </>
  ) : (
    <div className={styles.explanation}>
      <div className={`${styles.first_icon} material-symbols-outlined`}>
        lightbulb
      </div>
      <span className={styles.first_text}>
        추가한 메모가 여기에 표시됩니다.
      </span>
    </div>
  )}
</div>
<NoteModal />
</>
  )}

export default MemosDisplay;
