import React from "react";
import Modal from "react-modal";
import styles from "./EditConfirmModal.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "reduxprops/store/store";
import { handleCloseEditConfirmModal } from "@slice/modal/modalSlice";

const EditConfirmModal = () => {
  const dispatch = useDispatch();
  const isConfirmEditModalOpen = useSelector(
    (state: RootState) => state.modal.isConfirmEditModalOpen
  );
  const handleClose = () => {
    dispatch(handleCloseEditConfirmModal());
  };

  //Modal창 바깥 배경
  const customStyles = {
    overlay: {
      backgroundColor: "#0a0a0a99",
      zIndex: 100,
    },
  };

  return (
    <Modal
      isOpen={isConfirmEditModalOpen}
      onRequestClose={handleClose}
      className={styles.modal_container}
      style={customStyles}
      ariaHideApp={false}
    >
      EditConfirmModal
    </Modal>
  );
};

export default EditConfirmModal;
