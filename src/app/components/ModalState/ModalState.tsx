import React, { useState } from "react";
import Modal from "react-modal";
import styles from "./ModalState.module.scss";
import { useDispatch } from "react-redux";

const ModalState = () => {
  const dispatch = useDispatch();

  const handleItemClick = (itemName: string) => {
    localStorage.setItem("selectedItemName", itemName);
    if (itemName === "메모") {
      dispatch(setSelectedItem("Keep"));
    } else if (itemName !== "라벨 수정") {
      dispatch(setSelectedItem(itemName));
    }
  };

  return (
    <div className={styles.ReactModal__Content}>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        className={styles.modal_container}
        style={customStyles}
      >
        <div className={styles.modal_space}>
          <div className={styles.modal_upperSpace}>
            <span className={styles.modal_title}>라벨 수정</span>
            <div className={styles.modal_inputspace}>
              <IoMdAdd className={styles.add} />
              <input
                type="text"
                className={styles.input}
                placeholder="새 라벨 만들기"
              />
              <IoMdCheckmark className={styles.make} />
            </div>
          </div>
          <div className={styles.modal_downSpace}>
            <button onClick={handleCloseModal} className={styles.closingBtn}>
              완료
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ModalState;
