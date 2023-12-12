"use client";

import React, { useEffect, useState, memo } from "react";
import styles from "./Sidebar.module.scss";
import Link from "next/link";

const Sidebar = () => {
  const sidebarItems = [
    {
      name: "메모",
      iconName: "lightbulb",
      link: "/",
      textClass: styles.memo_text,
    },
    {
      name: "알림",
      iconName: "notifications",
      link: "/notification",
      textClass: styles.notification_text,
    },
    {
      name: "라벨 수정",
      iconName: "edit",
      link: "/",
      textClass: styles.editLabel_text,
    },
    {
      name: "보관처리",
      iconName: "archive",
      link: "/archiveProcessing",
      textClass: styles.archiveProcessing_text,
    },
    {
      name: "휴지통",
      iconName: "delete",
      link: "/trashCan",
      textClass: styles.trashCan_text,
    },
  ];

  return (
    <div className={`${styles.sidebar_space}`}>
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
