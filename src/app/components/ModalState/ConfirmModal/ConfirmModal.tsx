import React from "react";
import Modal from "react-modal";
import styles from "./ConfirmModal.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "reduxprops/store/store";
import { handleCloseConfirmModal } from "@slice/modal/modalSlice";
import { deleteLabel } from "@slice/menu/menuSlice";

const ConfirmModal = () => {
  const dispatch = useDispatch();
  const isConfirmModalOpen = useSelector(
    (state: RootState) => state.modal.isConfirmModalOpen
  );
  const handleCloseConfirmModalClose = () => {
    dispatch(handleCloseConfirmModal());
  };

  const labelToDelete = useSelector(
    (state: RootState) => state.menu.labelToDelete
  );
  const handleDeleteLabel = () => {
    dispatch(deleteLabel(labelToDelete));
    dispatch(handleCloseConfirmModal());
  };

  const customStyles = {
    overlay: {
      backgroundColor: "#0a0a0a99",
      zIndex: 200,
    },
  };

  return (
    <Modal
      isOpen={isConfirmModalOpen}
      onRequestClose={handleCloseConfirmModalClose}
      className={styles.modal_container}
      style={customStyles}
    >
      <div className={styles.text_space}>
        이 라벨을 삭제하고 모든 Keep 메모에서 삭제합니다. 메모는 삭제되지
        않습니다.
      </div>

      <div className={styles.btnSpace}>
        <button
          onClick={handleCloseConfirmModalClose}
          className={styles.closingBtn}
        >
          취소
        </button>
        <button
          onClick={() => {
            handleDeleteLabel();
          }}
          className={styles.deleteBtn}
        >
          삭제
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
