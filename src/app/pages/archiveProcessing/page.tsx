"use client";

import React, { useState } from "react";

import styles from "./archiveProcessing.module.scss";
import {
  actualPinToggle,
  deleteNote,
  moveBack,
  moveToTrashCan,
} from "@slice/memo/notesSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "reduxprops/store/store";

const ArchiveProcessing = () => {
  const dispatch = useDispatch();

  const archiveList = useSelector(
    (state: RootState) => state.notes.archiveList
  );
  return (
    <div className={styles.main_body}>
      {archiveList.length > 0 ? (
        archiveList.map((memo) => (
          <div
            key={memo.id}
            className={styles.memoContainer}
            style={{ backgroundColor: memo.backgroundColor }}
          >
            <div key={memo.id} className={styles.memo}>
              <h3 style={{ marginBottom: "10px" }}>{memo.title}</h3>
              <p style={{ whiteSpace: "pre-wrap" }}>{memo.text}</p>
              <div
                id={styles.push_pin}
                className={`material-symbols-outlined`}
                onClick={() => {
                  dispatch(moveBack(memo));
                  dispatch(actualPinToggle(memo.id));
                }}
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
                  dispatch(moveBack(memo));
                }}
              >
                move_up
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
            archive
          </div>
          <span className={styles.first_text}>
            보관처리된 메모가 여기에 표시됩니다.
          </span>
        </div>
      )}
    </div>
  );
};

export default ArchiveProcessing;
