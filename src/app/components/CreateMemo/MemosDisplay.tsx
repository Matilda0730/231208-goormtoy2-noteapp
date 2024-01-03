"use client";
import React, { useState } from "react";
import { Note } from "app/models/note";
import styles from "./MemosDisplay.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "reduxprops/store/store";
import { togglePaletteModal } from "@slice/modal/modalSlice";
import ColorModal from "./ColorModal";
import {
  actualPinToggle,
  moveToArchive,
  moveToTrashCan,
} from "@slice/memo/notesSlice";

interface MemosDisplayProps {
  memos: Note[]; // Note 타입의 배열을 받는 memos prop 추가
}

const MemosDisplay: React.FC<MemosDisplayProps> = ({ displayMemos }) => {
  const [pinClicked, setPinClicked] = useState<boolean>(false);
  const dispatch = useDispatch();

  const memos = useSelector((state: RootState) => state.notes.notes);
  const selectedLabelId = useSelector(
    (state: RootState) => state.menu.selectedLabelId
  );
  const filteredMemos = memos.filter((memo) =>
    selectedLabelId
      ? memo.tags && memo.tags.some((tag) => tag.id === selectedLabelId)
      : true
  );

  const handleToggleModal = () => {
    dispatch(togglePaletteModal());
  };

  const pinnedNotes = memos.filter((notes) => notes.isPinned);
  const normalNotes = memos.filter((notes) => !notes.isPinned);

  const pinToggle = () => {
    setPinClicked(!pinClicked);
  };

  return (
    <>
      <div className={styles.memo_space}>
        {memos.length > 0 ? (
          pinnedNotes.length > 0 ? (
            <div className={styles.pinSituation}>
              <div className={styles.standsText}>고정됨</div>
              <div className={styles.Notes_space}>
                {pinnedNotes.map((memo) => (
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
                        className={`${
                          pinClicked
                            ? `material-icons`
                            : `material-symbols-outlined`
                        }`}
                        onClick={() => {
                          pinToggle();
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
                ))}
              </div>
              <div className={styles.standsText}>기타</div>
              <div className={styles.Notes_space}>
                {normalNotes.map((memo) => (
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
                        className={`${
                          pinClicked
                            ? `material-icons`
                            : `material-symbols-outlined`
                        }`}
                        onClick={() => {
                          pinToggle();
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
                ))}
              </div>
            </div>
          ) : (
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
                    className={`${
                      pinClicked
                        ? `material-icons`
                        : `material-symbols-outlined`
                    }`}
                    onClick={() => {
                      pinToggle();
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
    </>
  );
};

export default MemosDisplay;
