"use client";
import React from "react";
import styles from "./NavbarPage.module.scss";
import "../../globals.scss";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "reduxprops/store/store";
import { toggleSidebar } from "@slice/sidebar/sidebarSlice";
import { toggleIcon } from "@slice/navbar/navbarSlice";

const Navbar: React.FC = () => {
  const pathname = usePathname() || "/";
  const getPageName = () => {
    if (pathname === "/") {
      // "Keep"일 경우 이미지와 텍스트 반환
      return (
        <>
          <img
            src="https://www.gstatic.com/images/branding/product/2x/keep_2020q4_48dp.png"
            alt="Keep"
          />
          <p>Keep</p>
        </>
      );
    } else if (pathname === "/pages/notification") {
      return <p>알림</p>;
    } else if (pathname === "/pages/archiveProcessing") {
      return <p>보관처리</p>;
    } else if (pathname === "/pages/trashCan") {
      return <p>휴지통</p>;
    } else if (pathname.startsWith("/pages/label/")) {
      const encodedLabelName = pathname.split("/")[3];
      const labelName = decodeURIComponent(encodedLabelName);
      return <p>{labelName}</p>;
    }
    return <p>Keep</p>;
  };

  const selectedItemName = useSelector(
    (state: RootState) => state.menu.selectedItem
  );
  const dispatch = useDispatch();
  const icon = useSelector((state: RootState) => state.navbar.icon);
  const isSidebarOpen = useSelector(
    (state: RootState) => state.sidebar.isSidebarOpen
  );

  return (
    <div className={styles.Navbar_container}>
      <div className={styles.menu_bar}>
        <div className={styles.menu_bar_icon}>
          <span
            onClick={() => {
              dispatch(toggleSidebar());
            }}
            className="material-symbols-outlined icons"
          >
            menu
          </span>
        </div>
        <div className={styles.keep_and_name}>
          {getPageName()} :{<div className={styles.img_div}></div>}
        </div>
      </div>

      <div className={styles.search_bar}>
        <div className={styles.search_wrapper}>
          <span
            className="material-symbols-outlined icons"
            id={styles.search_icon}
          >
            search
          </span>
          <input
            className={styles.search_input}
            type="text"
            placeholder="Search"
          />
        </div>
      </div>

      <div className={styles.option_bar}>
        <span className="material-symbols-outlined icons">refresh</span>
        <span className="material-symbols-outlined icons">settings</span>
        <span
          className="material-symbols-outlined icons"
          onClick={() => dispatch(toggleIcon())}
        >
          {icon}
        </span>
      </div>

      <div className={styles.toggle_bar}>
        <span className="material-symbols-outlined icons">apps</span>
        <span className="material-symbols-outlined icons">person</span>
      </div>
    </div>
  );
};

export default Navbar;
