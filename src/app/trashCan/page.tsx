"use client";
import React, { useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import CreateMemo from "../components/CreateMemo/CreateMemo";
import styles from "./trashCan.module.scss";

const TrashCan = () => {
  const [isNone, setIsNone] = useState(true);

  return (
    <div className={styles.pageBody}>
      <Sidebar />
      <div className={styles.main_body}>
        <CreateMemo />
        {isNone ? (
          <div className={styles.explanation}>
            <div className={`${styles.first_icon} material-symbols-outlined`}>
              delete
            </div>
            <span className={styles.first_text}>
              보관처리된 메모가 여기에 표시됩니다.{" "}
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default TrashCan;
