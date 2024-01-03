"use client";
import React, { useState } from "react";

import styles from "./trashCan.module.scss";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "reduxprops/store/store";
import CreateMemo from "@components/CreateMemo/CreateMemo";
import { deleteNote, moveBack } from "@slice/memo/notesSlice";

const TrashCan = () => {
  const dispatch = useDispatch();

  const trashCan = useSelector((state: RootState) => state.notes.trashCan);

  return (
    <div className={styles.main_body}>
      {trashCan.length > 0 ? (
        trashCan.map((memo) => (
          <div
            key={memo.id}
            className={styles.memoContainer}
            style={{ backgroundColor: memo.backgroundColor }}
          >
            <div key={memo.id} className={styles.memo}>
              <h3 style={{ marginBottom: "10px" }}>{memo.title}</h3>
              <p>{memo.text}</p>
            </div>
            <div className={styles.memoButton_space}>
              <div
                id={styles.bottom_icons}
                className={`material-icons`}
                onClick={() => {
                  dispatch(deleteNote(memo.id));
                }}
              >
                delete_forever
              </div>
              <div
                id={styles.bottom_icons}
                className={`material-icons`}
                onClick={() => {
                  dispatch(moveBack(memo));
                }}
              >
                restore_from_trash
              </div>
            </div>
            {/* <ColorModal /> */}
          </div>
        ))
      ) : (
        <div className={styles.explanation}>
          <div className={`${styles.first_icon} material-symbols-outlined`}>
            delete
          </div>
          <span className={styles.first_text}>
            보관처리된 메모가 여기에 표시됩니다.
          </span>
        </div>
      )}
    </div>
  );
};

export default TrashCan;
