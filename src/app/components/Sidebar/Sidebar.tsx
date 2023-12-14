"use client";

import React, { useEffect, useState, memo, useRef } from "react";
import styles from "./Sidebar.module.scss";
import Link from "next/link";
import Navbar from "../../Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { toggleSidebar } from "../../../redux/features/sidebar/sidebarSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
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
          <Link
            key={idx}
            id={styles.focus}
            href={page.link}
            className={styles.sidebar_menu}
          >
            <div
              className={`${styles.sidebar_icons} material-symbols-outlined`}
            >
              {page.iconName}
            </div>
            <span className={page.textClass}> {page.name}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default Sidebar;
