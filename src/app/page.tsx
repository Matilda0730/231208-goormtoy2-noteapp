"use client";

import styles from "./page.module.scss";
import "./globals.scss";

import react, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import CreateMemo from "@components/CreateMemo/CreateMemo";
import { toggleSidebar } from "reduxprops/features/sidebar/sidebarSlice";
import { RootState } from "reduxprops/store/store";

export default function Home() {
  const [isNone, setIsNone] = useState(true);
  // const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // const toggleSidebar = () => {
  // 	setIsSidebarOpen(!isSidebarOpen);
  // };
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector(
    (state: RootState) => state.sidebar.isSidebarOpen
  );

  return (
    <div className={styles.main_body}>
      <CreateMemo />
      {isNone ? (
        <div className={styles.explanation}>
          <div
            onClick={() => {
              dispatch(toggleSidebar());
              console.log(isSidebarOpen);
            }}
            className={`${styles.first_icon} material-symbols-outlined`}
          >
            lightbulb
          </div>
          <span className={styles.first_text}>
            추가한 메모가 여기에 표시됩니다.
          </span>
        </div>
      ) : null}
    </div>
  );
}
