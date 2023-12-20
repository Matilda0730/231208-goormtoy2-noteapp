"use client";

import React, { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import styles from "./ModalState.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  handleCloseModal,
  setNewLabels,
  deleteLabel,
} from "reduxprops/features/modal/modalSlice";
import { RootState } from "reduxprops/store/store";
import { setCreatedLabel } from "@slice/menu/menuSlice";

interface ModalTagStateProps {
  defaultText: string;
  hoverText: string;
}

const ModalState = () => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector(
    (state: RootState) => state.modal.isModalOpen
  );
  const modalLabels = useSelector((state: RootState) => state.modal.labels);
  const [labelName, setLabelName] = useState("");
  const [mode, setMode] = useState(true);

  const handleAddLabel = () => {
    if (!labelName) {
      return;
    }
    dispatch(setCreatedLabel(labelName));
    dispatch(setNewLabels(labelName));
    setLabelName("");
  };

  const handleDeleteLabel = () => {
    dispatch(deleteLabel(""));
  };

  const handleClose = () => {
    dispatch(handleCloseModal());
  };

  //호버 시 쓰레기통으로 바꾸기
  const [isHovered, setIsHovered] = useState(false);

  //Modal창 바깥 배경
  const customStyles = {
    overlay: {
      backgroundColor: "#0a0a0a99",
      zIndex: 100,
    },
  };

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={handleClose}
      className={styles.modal_container}
      style={customStyles}
    >
      <div className={styles.modal_space}>
        <div className={styles.modal_upperSpace}>
          <span className={styles.modal_title}>라벨 수정</span>
          {mode ? (
            <>
              <div className={styles.modal_inputspace}>
                <div
                  className={`${styles.inputIcons} material-icons`}
                  style={{ userSelect: "none" }}
                  onClick={() => {
                    setLabelName("");
                    setMode(false);
                  }}
                >
                  close
                </div>
                <input
                  ref={inputRef}
                  type="text"
                  autoFocus
                  className={styles.input}
                  placeholder="새 라벨 만들기"
                  onChange={(e) => setLabelName(e.target.value)}
                  value={labelName}
                />
                <div
                  className={`${styles.inputIcons} material-icons`}
                  style={{ userSelect: "none" }}
                  onClick={() => {
                    handleAddLabel();
                  }}
                >
                  done
                </div>
              </div>
            </>
          ) : (
            <>
              <div className={styles.modal_inputspace}>
                <div
                  className={`${styles.inputIcons} material-icons`}
                  style={{ userSelect: "none" }}
                  onClick={() => {
                    setMode(true);
                    inputRef.current && inputRef.current.focus();
                  }}
                >
                  add
                </div>
                <input
                  ref={inputRef}
                  type="text"
                  className={styles.input}
                  placeholder="새 라벨 만들기"
                  onClick={() => setMode(true)}
                />
                <div
                  className={`${styles.inputIcons} material-icons`}
                  style={{ visibility: "hidden" }}
                >
                  done
                </div>
              </div>
            </>
          )}
          <>
            {modalLabels.map((label) => {
              // console.log(name);
              return (
                <div
                  key={label.id}
                  className={styles.createdLabel}
                  style={{ display: "flex" }}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <div
                    className={`${styles.labelsIcon} material-icons`}
                    onClick={handleDeleteLabel}
                  >
                    {isHovered ? "delete" : "label"}
                  </div>
                  <div className={styles.labelName}>{label.name}</div>
                  <div className={`${styles.labelsIcon} material-icons`}>
                    edit
                  </div>
                </div>
              );
            })}
          </>
        </div>
        <div className={styles.modal_downSpace}>
          <button onClick={handleClose} className={styles.closingBtn}>
            완료
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalState;
