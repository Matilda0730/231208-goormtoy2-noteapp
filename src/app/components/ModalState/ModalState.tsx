"use client";

import React, { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import styles from "./ModalState.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { IoMdAdd } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
import { IoMdCheckmark } from "react-icons/io";
import {
  handleCloseModal,
  setNewLabels,
} from "reduxprops/features/modal/modalSlice";
import { RootState } from "reduxprops/store/store";
import { setCreatedLabel } from "@slice/menu/menuSlice";

const ModalState = () => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector(
    (state: RootState) => state.modal.isModalOpen
  );
  const [labelName, setLabelName] = useState("");
  const [mode, setMode] = useState(true);

  const handleAddLabel = () => {
    if (!labelName) {
      return;
    }
    dispatch(setCreatedLabel(labelName));
    dispatch(setNewLabels(labelName));
    console.log(labelName);
    setLabelName("");
  };

  const handleClose = () => {
    dispatch(handleCloseModal());
  };

  const customStyles = {
    overlay: {
      backgroundColor: "#0a0a0a99",
      zIndex: 100,
    },
  };

  // 왜 modal을 쓰면 isModalOpen밖에 인식을 못할까..
  // const modalLabels = useSelector((state: RootState) => state.modal.labels);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleDoubleClick = (event: React.MouseEvent) => {
    event.preventDefault(); // 더블클릭 기본 동작 막기
  };

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
          {/* {modalLabels.map((name, idx) => {
            return (
              <div key={idx} className={styles.createdLabel}>
                <div className={`${styles.labelsIcon} material-icons`}>
                  label
                </div>
                <div className={styles.labelName}>{name}</div> 
                <div className={`${styles.labelsIcon} material-icons`}>
                  edit
                </div>
              </div>
            );
          })} */}
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
