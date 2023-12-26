"use client";

import React, { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import styles from "./ModalState.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  handleCloseModal,
  handleOpenConfirmModal,
} from "reduxprops/features/modal/modalSlice";
import { RootState } from "reduxprops/store/store";
import {
  setCreatedLabel,
  setLabelToDelete,
  setLabelToUpdate,
  updateLabel,
} from "@slice/menu/menuSlice";
import ConfirmModal from "./ConfirmModal/ConfirmModal";

// Modal.setAppElement("#__next"); // Next.js에서 사용되는 루트 요소의 ID를 설정

const ModalState = () => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector(
    (state: RootState) => state.modal.isModalOpen
  );
  const modalLabels = useSelector(
    (state: RootState) => state.menu.newLabelSpace
  );
  const errorMessage = useSelector(
    (state: RootState) => state.menu.errorMessage
  );
  const [labelName, setLabelName] = useState("");
  const [mode, setMode] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  //라벨 추가 동작 함수
  const handleAddLabel = () => {
    if (!labelName) {
      return;
    }
    dispatch(setCreatedLabel(labelName));
    inputRef.current?.focus();
  };
  //생성하려는 라벨이 이미 있는 이름이면 input value 없애지 않기.
  useEffect(() => {
    if (errorMessage) {
      setLabelName(labelName);
    }
    setLabelName("");
  }, [modalLabels]);

  //모달창 닫기
  const handleClose = () => {
    dispatch(handleCloseModal());
  };
  //삭제 확인창 띄우기
  const handleOpenConfirmModalOpen = (labelId: string) => {
    dispatch(handleOpenConfirmModal());
    dispatch(setLabelToDelete(labelId));
  };

  //호버 시 쓰레기통으로 바꾸기
  const [isHovered, setIsHovered] = useState<number | null>(null);
  //수정 버튼 누르면 div => input으로 바꾸기
  const [editOn, setEditOn] = useState<number | null>(null);

  const [editingLabelName, setEditingLabelName] = useState<string>("");

  const handleToggleEdit = (index: number) => {
    const label = modalLabels[index];
    setEditOn((toggle) => (toggle === index ? null : index));
    setEditingLabelName(label.name);
  };

  const handleEditInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEditingLabelName(event.target.value);
  };

  const handleEditLabel = (index: number) => {
    // dispatch(setLabelToUpdate(index, editingLabelName));
    // 예: dispatch(updateLabel(index, editingLabelName));
    setEditOn(null);
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
      >
        <div className={styles.modal_space}>
          <div className={styles.modal_upperSpace}>
            <span className={styles.modal_title}>라벨 수정</span>
            {mode ? (
              <>
                <div className={styles.modal_inputspace}>
                  <div
                    className={`${styles.inputIcons} material-icons`}
                    // style={{ userSelect: "none" }}
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
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        handleAddLabel();
                      }
                    }}
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
                {errorMessage && (
                  <div className={styles.errorMessage}>{errorMessage}</div>
                )}
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
              {modalLabels.map((label, index) => {
                return (
                  <div
                    key={label.id}
                    className={styles.createdLabel}
                    onMouseEnter={() => setIsHovered(index)}
                    onMouseLeave={() => setIsHovered(null)}
                  >
                    <div
                      className={`${styles.labelsIcon} material-icons`}
                      onClick={() => {
                        handleOpenConfirmModalOpen(label.id);
                      }}
                    >
                      {isHovered === index ? "delete" : "label"}
                    </div>
                    {editOn === index ? (
                      <input
                        className={styles.inputToEdit}
                        onChange={handleEditInputChange}
                        value={editingLabelName}
                        onKeyDown={(event) => {
                          if (event.key === "Enter") {
                            handleEditLabel(index);

                            if (editOn === index) {
                              dispatch(setLabelToUpdate(label));
                              const editingLabel = {
                                name: editingLabelName,
                                iconName: "label",
                                link: `/pages/label/${editingLabelName}`,
                                id: editingLabelName,
                              };

                              dispatch(updateLabel(editingLabel));
                            }
                          }
                        }}
                      />
                    ) : (
                      <div className={styles.labelName}>{label.name}</div>
                    )}
                    <div
                      className={`${styles.labelsIcon} material-icons`}
                      onClick={() => {
                        handleToggleEdit(index);
                        if (editOn === index) {
                          dispatch(setLabelToUpdate(label));
                          const editingLabel = {
                            name: editingLabelName,
                            iconName: "label",
                            link: `/pages/label/${editingLabelName}`,
                            id: editingLabelName,
                          };

                          dispatch(updateLabel(editingLabel));
                        }
                      }}
                    >
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
      <ConfirmModal />
    </>
  );
};

export default ModalState;
