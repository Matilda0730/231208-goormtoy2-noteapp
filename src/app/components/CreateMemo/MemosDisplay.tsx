"use client";
import React from "react";
import { Note } from "app/models/note";
import styles from "./MemosDisplay.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "reduxprops/store/store";
import { togglePaletteModal } from "@slice/modal/modalSlice";
import ColorModal from "./ColorModal";
import { moveToArchive, moveToTrashCan } from "@slice/memo/notesSlice";

const MemosDisplay = () => {
  const memos = useSelector((state: RootState) => state.notes.notes);

  const dispatch = useDispatch();

  const handleToggleModal = () => {
    dispatch(togglePaletteModal());
  };

  return (
    <>
      <div className={styles.pin_space}></div>
      <div className={styles.memo_space}>
        {memos.length > 0 ? (
          memos.map((memo) => (
            <div
              key={memo.id}
              className={styles.memoContainer}
              style={{ backgroundColor: memo.backgroundColor }}
            >
              <div key={memo.id} className={styles.memo}>
                <h3 style={{ marginBottom: "10px" }}>{memo.title}</h3>
                <p>{memo.text}</p>
                <div
                  id={styles.push_pin}
                  className={`material-symbols-outlined`}
                >
                  push_pin
                </div>
              </div>
              <div className={styles.memoButton_space}>
                <div
                  id={styles.bottom_icons}
                  className={`material-symbols-outlined`}
                >
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
          ))
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
    </>
  );
};

export default MemosDisplay;
