import React from "react";
import Modal from "react-modal";
import styles from "./ConfirmModal.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "reduxprops/store/store";
import { handleCloseConfirmModal } from "@slice/modal/modalSlice";
import { deleteLabel, setLabelToDelete } from "@slice/menu/menuSlice";

const EditConfirmModal = () => {
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
        &lsquo;fasdf&rsquo; 라벨을 &lsquo;22&rsquo; 라벨과 병합하시겠습니까?
        라벨이 &lsquo;fasdf&rsquo;(으)로 지정된 모든 메모는
        &lsquo;22&rsquo;(으)로 라벨이 지정되며 &lsquo;fasdf&rsquo; 라벨은
        삭제됩니다.
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
          className={styles.mergeBtn}
        >
          병합
        </button>
      </div>
    </Modal>
  );
};

export default EditConfirmModal;
