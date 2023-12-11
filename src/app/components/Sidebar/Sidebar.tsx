import React from "react";
import styles from "./Sidebar.module.scss";
import Link from "next/link";

const Sidebar = () => {
  return (
    <div className={styles.sidebar_space}>
      <Link id={styles.focus} href="/" className={styles.sidebar_menu}>
        <div className={`${styles.sidebar_icons} material-symbols-outlined`}>
          lightbulb
        </div>
        <span className={styles.memo_text}>메모</span>
      </Link>
      <Link href="/" className={styles.sidebar_menu}>
        <div className={`${styles.sidebar_icons} material-symbols-outlined`}>
          notifications
        </div>
        <span className={styles.notification_text}>알림</span>
      </Link>
      <div className={styles.sidebar_menu}>
        <div className={`${styles.sidebar_icons} material-symbols-outlined`}>
          edit
        </div>
        <span className={styles.editLabel_text}>라벨 수정</span>
      </div>
      <Link href="/" className={styles.sidebar_menu}>
        <div className={`${styles.sidebar_icons} material-symbols-outlined`}>
          archive
        </div>
        <span className={styles.archiveProcessing_text}>보관처리</span>
      </Link>
      <Link href="/" className={styles.sidebar_menu}>
        <div className={`${styles.sidebar_icons} material-symbols-outlined`}>
          delete
        </div>
        <span className={styles.trashCan_text}>휴지통</span>
      </Link>
    </div>
  );
};

export default Sidebar;
