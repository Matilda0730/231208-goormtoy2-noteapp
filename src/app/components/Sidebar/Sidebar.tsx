"use client";

import React, { useEffect, useState } from "react";
import styles from "./Sidebar.module.scss";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

import ModalState from "@components/ModalState/ModalState";
import { handleOpenModal } from "@slice/modal/modalSlice";
import { setSelectedItem, setSelectedMenu } from "@slice/menu/menuSlice";
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

  // 현재 있는 사이드바 메뉴 색 입히기
  const selectedMenuItem = useSelector(
    (state: RootState) => state.menu.selectedMenu
  );

  return (
    <div
      className={`${styles.sidebar_space} ${
        isSidebarOpen ? styles.toggle_sidebar : ""
      }`}
    >
      {sidebarItems.map((page) => {
        return (
          <React.Fragment key={page.id}>
            {page.iconName === "edit" ? (
              <div
                key={page.id}
                className={styles.sidebar_menu}
                onClick={handleOpen}
              >
                <div
                  className={`${styles.sidebar_icons} material-symbols-outlined`}
                >
                  {page.iconName}
                </div>
                <span>{page.name}</span>
              </div>
            ) : (
              <Link
                href={page.link}
                key={page.id}
                className={`${styles.sidebar_menu} ${
                  selectedMenuItem === page.id ? styles.selected_menu : ""
                }`}
                onClick={() => {
                  handleItemClick(page.name);
                  dispatch(setSelectedMenu(page.id));
                }}
              >
                <div
                  className={`${
                    selectedMenuItem === page.id ? styles.selected_menu : ""
                  } ${styles.sidebar_icons} material-symbols-outlined`}
                >
                  {page.iconName}
                </div>
                <span>{page.name}</span>
              </Link>
            )}
          </React.Fragment>
        );
      })}
      <div className={styles.license}>Made by CPK</div>
      <ModalState />
    </div>
  );
};

export default Sidebar;
