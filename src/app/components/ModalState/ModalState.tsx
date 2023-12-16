"use client";

import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import styles from "./ModalState.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { IoMdAdd } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
import { IoMdCheckmark } from "react-icons/io";
import { RootState } from "../../../redux/store";
import {
  handleOpenModal,
  handleCloseModal,
} from "../../../redux/features/modal/modalSlice";

const ModalState = () => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector(
    (state: RootState) => state.modal.isModalOpen
  );
  const [plusAndX, setPlusAndX] = useState("");

  useEffect(() => {});

  const handleClose = () => {
    dispatch(handleCloseModal());
  };

  const customStyles = {
    overlay: {
      backgroundColor: "#0a0a0a99",
      zIndex: 100,
    },
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
          <div className={styles.modal_inputspace}>
            <IoMdAdd className={styles.add} />
            {/* <MdOutlineCancel className={styles.add} /> */}
            <input
              type="text"
              className={styles.input}
              placeholder="새 라벨 만들기"
            />
            <IoMdCheckmark className={styles.make} />
          </div>
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
