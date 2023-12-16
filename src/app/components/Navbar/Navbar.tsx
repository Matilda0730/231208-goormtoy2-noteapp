"use client";
import React from "react";
import styles from "./NavbarPage.module.scss";
import "../../globals.scss";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "reduxprops/store/store";
import { toggleSidebar } from "@slice/sidebar/sidebarSlice";
import { toggleIcon } from "@slice/navbar/navbarSlice";

const Navbar: React.FC = () => {
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
              console.log(isSidebarOpen);
            }}
            className="material-symbols-outlined icons"
          >
            menu
          </span>
        </div>
        <div className={styles.keep_and_name}>
          {selectedItemName === "Keep" ? (
            <img
              src="https://www.gstatic.com/images/branding/product/2x/keep_2020q4_48dp.png"
              alt="menu"
            ></img>
          ) : (
            <div className={styles.img_div}></div>
          )}
          <p>{selectedItemName}</p>
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
