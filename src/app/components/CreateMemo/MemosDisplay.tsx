"use client";
import React, { useEffect, useState } from "react";
import { Note } from "app/models/note";
import styles from "./MemosDisplay.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "reduxprops/store/store";
import {
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

const MemosDisplay = () => {
  const dispatch = useDispatch();
  const allMemos = useSelector((state: RootState) => state.notes.notes);
  const selectedLabelId = useSelector(
    (state: RootState) => state.menu.selectedLabelId
  );

  const [pinnedFilteredMemos, setPinnedFilteredMemos] = useState<Note[]>([]);
  const [normalFilteredMemos, setNormalFilteredMemos] = useState<Note[]>([]);

  useEffect(() => {
    const filteredMemos = selectedLabelId
      ? allMemos.filter((memo) =>
          memo.tags?.some((tag) => tag.id === selectedLabelId)
        )
      : allMemos;

    const pinnedMemos = filteredMemos.filter((memo) => memo.isPinned);
    const normalMemos = filteredMemos.filter((memo) => !memo.isPinned);

    setPinnedFilteredMemos(pinnedMemos);
    setNormalFilteredMemos(normalMemos);
  }, [selectedLabelId, allMemos]);

  const memos = useSelector((state: RootState) => state.notes.notes);

  const pinnedNotes = memos.filter((notes) => notes.isPinned);
  const normalNotes = memos.filter((notes) => !notes.isPinned);

  const pinToggle = (memoId: string) => {
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
          <p>{memo.text}</p>
          <div
            id={styles.push_pin}
            className={`${
              memo.isPinned ? `material-icons` : `material-symbols-outlined`
            }`}
            onClick={() => {
              pinToggle(memo.id);
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
        {memos.length > 0 ? (
          pinnedNotes.length > 0 ? (
            <div className={styles.pinSituation}>
              <div className={styles.standsText}>고정됨</div>
              <div className={styles.Notes_space}>
                {mapElements(pinnedNotes)}
              </div>
              {normalNotes.length > 0 ? (
                <div className={styles.standsText}>기타</div>
              ) : null}
              <div className={styles.Notes_space}>
                {mapElements(normalNotes)}
              </div>
            </div>
          ) : (
            mapElements(memos)
          )
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
  );
};

export default MemosDisplay;
