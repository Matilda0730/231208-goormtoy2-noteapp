"use client";
import React, { useState } from "react";
import styles from "./NavbarPage.module.scss";
import "../globals.scss";

const Navbar: React.FC = () => {
  const [icon, setIcon] = useState<"view_stream" | "grid_view">("view_stream");
  const toggleIcon = () => {
    setIcon(icon === "view_stream" ? "grid_view" : "view_stream");
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={styles.Navbar_container}>
      <div className={styles.menu_bar}>
        <span onClick={toggleSidebar} className="material-icons icons">
          menu
        </span>
        <img
          src="https://www.gstatic.com/images/branding/product/2x/keep_2020q4_48dp.png"
          alt="menu"
        ></img>
        <p>Keep</p>
      </div>

      <div className={styles.search_bar}>
        <div className={styles.search_wrapper}>
          <span className="material-icons icons" id={styles.search_icon}>
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
        <span className="material-icons icons">refresh</span>
        <span className="material-icons icons">settings</span>
        <span className="material-icons icons" onClick={toggleIcon}>
          {icon}
        </span>
      </div>

      <div className={styles.toggle_bar}>
        <span className="material-icons icons">apps</span>
      </div>
    </div>
  );
};

export default Navbar;
