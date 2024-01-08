"use client";

import {
  handleCloseNoteModal,
  handleOpenNoteModal,
  togglePaletteModal,
} from "@slice/modal/modalSlice";
import React, { useEffect, useState } from "react";
import styles from "./NoteModal.module.scss";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "reduxprops/store/store";
import {
  actualPinToggle,
  moveToArchive,
  moveToTrashCan,
  updateNoteText,
  updateNoteTitle,
} from "@slice/memo/notesSlice";

const NoteModal = () => {
  const dispatch = useDispatch();

  const isModalOpen = useSelector(
    (state: RootState) => state.modal.isNoteModalOpen
  );

  const handleClose = () => {
    dispatch(handleCloseNoteModal());
  };

  const selectedMemoId = useSelector(
    (state: RootState) => state.menu.selectedMemoId
  );

  const selectedMemo = useSelector((state: RootState) =>
    state.notes.notes.find((memo) => memo.id === selectedMemoId)
  );

  const [noteTitle, setNoteTitle] = useState(selectedMemo?.title || "");
  const [noteText, setNoteText] = useState(selectedMemo?.text || "");

  useEffect(() => {
    if (selectedMemo) {
      setNoteTitle(selectedMemo?.title || "");
      setNoteText(selectedMemo?.text || "");
    }
  }, [selectedMemo]);

  const handleNoteTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    if (selectedMemo) {
      dispatch(updateNoteTitle({ memoId: selectedMemo.id, newTitle }));
    }
    setNoteTitle(newTitle);
  };

  const handleNoteText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    if (selectedMemo) {
      dispatch(updateNoteText({ memoId: selectedMemo.id, newText }));
    }
    setNoteText(newText);
  };

  const pinToggle = (memoId: string) => {
    dispatch(actualPinToggle(memoId));
  };

  const autoResize = (element: HTMLTextAreaElement | null) => {
    if (element) {
      element.style.height = "auto";
      element.style.height = element.scrollHeight + "px";
    }
  };

  //Modal창 바깥 배경
  const customStyles = {
    overlay: {
      backgroundColor: "#0a0a0a99",
      zIndex: 100,
    },
  };
  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleClose}
        className={styles.modal_container}
        style={customStyles}
        ariaHideApp={false}
      >
        <div className={styles.memo_space}>
          {selectedMemo && (
            <div
              key={selectedMemo.id}
              className={styles.memoContainer}
              style={{ backgroundColor: selectedMemo.backgroundColor }}
            >
              <div key={selectedMemo.id} className={styles.memo}>
                <input
                  className={styles.title}
                  value={noteTitle}
                  onChange={handleNoteTitle}
                  placeholder="제목"
                ></input>
                <textarea
                  className={styles.text}
                  value={noteText}
                  onChange={handleNoteText}
                  onInput={(e) => autoResize(e.currentTarget)}
                ></textarea>
                <div
                  id={styles.push_pin}
                  className={`${
                    selectedMemo.isPinned
                      ? `material-icons`
                      : `material-symbols-outlined`
                  }`}
                  onClick={() => {
                    pinToggle(selectedMemo.id);
                  }}
                >
                  push_pin
                </div>
              </div>
              <div className={styles.labels_container}>
                {selectedMemo.tags &&
                  selectedMemo.tags.map((label, index) => (
                    <span key={index} className={styles.label}>
                      {label.name}
                    </span>
                  ))}
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
                >
                  palette
                </div>
                <div
                  id={styles.bottom_icons}
                  className={`material-symbols-outlined`}
                  onClick={() => {
                    dispatch(moveToArchive(selectedMemo));
                    handleClose();
                  }}
                >
                  archive
                </div>
                <div
                  id={styles.bottom_icons}
                  className={`material-symbols-outlined`}
                  onClick={() => {
                    dispatch(togglePaletteModal());
                  }}
                >
                  label
                </div>
                <div
                  id={styles.bottom_icons}
                  className={`material-symbols-outlined`}
                  onClick={() => {
                    dispatch(moveToTrashCan(selectedMemo));
                    handleClose();
                  }}
                >
                  delete
                </div>
                <div
                  className={styles.closeButton}
                  onClick={() => {
                    handleClose();
                  }}
                >
                  닫기
                </div>
              </div>
              {/* <ColorModal /> */}
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};

export default NoteModal;
