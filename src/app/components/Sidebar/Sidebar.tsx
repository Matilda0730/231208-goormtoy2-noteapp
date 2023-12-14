"use client";

import React, { useEffect, useState, memo, useRef } from "react";
import styles from "./Sidebar.module.scss";
import Link from "next/link";
import Navbar from "../../Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { toggleSidebar } from "../../../redux/features/sidebar/sidebarSlice";
import ModalState from "./ModalState/ModalState";
import Modal from "react-modal";
import { IoMdAdd } from "react-icons/io";
import { IoMdCheckmark } from "react-icons/io";

const Sidebar = () => {
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector(
    (state: RootState) => state.sidebar.isSidebarOpen
  );

  const sidebarItems = useSelector((state: RootState) => state.menu.items);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
  };

  return (
    <div
      className={`${styles.sidebar_space} ${
        isSidebarOpen ? styles.toggle_sidebar : ""
      }`}
    >
      {sidebarItems.map((page, idx) => {
        return (
          <>
            {idx === 2 ? (
              <div
                key={idx}
                className={styles.sidebar_menu}
                onClick={openModal}
              >
                <div
                  className={`${styles.sidebar_icons} material-symbols-outlined`}
                >
                  {page.iconName}
                </div>
                <span className={page.textClass}>{page.name}</span>
              </div>
            ) : (
              <Link href={page.link} key={idx} className={styles.sidebar_menu}>
                <div
                  className={`${styles.sidebar_icons} material-symbols-outlined`}
                >
                  {page.iconName}
                </div>
                <span className={page.textClass}>{page.name}</span>
              </Link>
            )}
          </>
        );
      })}

      <div className={styles.ReactModal__Overlay}>
        <div className={styles.ReactModal__Content}>
          <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
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
                <button onClick={closeModal} className={styles.closingBtn}>
                  완료
                </button>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
