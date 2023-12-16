"use client";

import React, { useState } from "react";

import styles from "./archiveProcessing.module.scss";
import CreateMemo from "@components/CreateMemo/CreateMemo";

const ArchiveProcessing = () => {
  const [isNone, setIsNone] = useState(true);

  return (
    <div className={styles.pageBody}>
      <div className={styles.main_body}>
        <CreateMemo />
        {isNone ? (
          <div className={styles.explanation}>
            <div className={`${styles.first_icon} material-symbols-outlined`}>
              archive
            </div>
            <span className={styles.first_text}>
              보관처리된 메모가 여기에 표시됩니다.
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ArchiveProcessing;
