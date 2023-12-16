"use client";

import React, { useEffect, useState, memo, useRef } from "react";
import styles from "./Sidebar.module.scss";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

import ModalState from "@components/ModalState/ModalState";
import { handleOpenModal } from "@slice/modal/modalSlice";
import { setSelectedItem } from "@slice/menu/menuSlice";
import { RootState } from "reduxprops/store/store";

const Sidebar = () => {
  const dispatch = useDispatch();

  const handleOpen = () => {
    dispatch(handleOpenModal());
  };

  const handleItemClick = (itemName: string) => {
    localStorage.setItem("selectedItemName", itemName);
    if (itemName === "메모") {
      dispatch(setSelectedItem("Keep"));
    } else if (itemName !== "라벨 수정") {
      dispatch(setSelectedItem(itemName));
    }
  };

  useEffect(() => {
    const savedItemName = localStorage.getItem("selectedItemName");
    if (savedItemName) {
      if (savedItemName === "메모") {
        dispatch(setSelectedItem("Keep"));
      } else {
        dispatch(setSelectedItem(savedItemName));
      }
    }
  }, [dispatch]);

  const isSidebarOpen = useSelector(
    (state: RootState) => state.sidebar.isSidebarOpen
  );

  const sidebarItems = useSelector((state: RootState) => state.menu.items);

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
                onClick={handleOpen}
              >
                <div
                  className={`${styles.sidebar_icons} material-symbols-outlined`}
                >
                  {page.iconName}
                </div>
                <span className={page.textClass}>{page.name}</span>
              </div>
            ) : (
              <Link
                href={page.link}
                key={idx}
                className={styles.sidebar_menu}
                onClick={() => handleItemClick(page.name)}
              >
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

      <ModalState />
    </div>
  );
};

export default Sidebar;
