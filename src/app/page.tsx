"use client";

import styles from "./page.module.scss";
import "./globals.scss";
import CreateMemo from "./components/CreateMemo/CreateMemo";
import react, { useState } from "react";
import Link from "next/link";
import Sidebar from "./components/Sidebar/Sidebar";

export default function Home() {
  const [isNone, setIsNone] = useState(true);

  return (
    <div className={styles.pageBody}>
      <Sidebar />
      <div className={styles.main_body}>
        <CreateMemo />
        {isNone ? (
          <div className={styles.explanation}>
            <div className={`${styles.first_icon} material-symbols-outlined`}>
              lightbulb
            </div>
            <span className={styles.first_text}>
              추가한 메모가 여기에 표시됩니다.
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );
}
