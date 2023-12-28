import React from "react";
import Modal from "react-modal";
import styles from "./EditConfirmModal.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "reduxprops/store/store";
import { handleCloseEditConfirmModal } from "@slice/modal/modalSlice";
import { deleteLabel, setLabelToDelete } from "@slice/menu/menuSlice";

const EditConfirmModal = () => {
  const dispatch = useDispatch();
  const isConfirmEditModalOpen = useSelector(
    (state: RootState) => state.modal.isConfirmEditModalOpen
  );
  const mergeToExisted = useSelector(
    (state: RootState) => state.menu.mergeToExisted
  );
  const existedLabel = useSelector(
    (state: RootState) => state.menu.existedLabel
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
      <div className={styles.text_space}>
        {`'${mergeToExisted?.name}'라벨을 '${existedLabel}'라벨과 병합하시겠습니까? 라벨이 '${mergeToExisted?.name}'(으)로 지정된 모든 메모는 '${existedLabel}'(으)로 라벨이 지정되며 '${mergeToExisted?.name}' 라벨은 삭제됩니다.`}
      </div>
      <div className={styles.btnSpace}>
        <button onClick={handleClose} className={styles.closingBtn}>
          취소
        </button>
        <button
          onClick={() => {
            dispatch(deleteLabel(mergeToExisted!.name));
            dispatch(handleCloseEditConfirmModal());
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
