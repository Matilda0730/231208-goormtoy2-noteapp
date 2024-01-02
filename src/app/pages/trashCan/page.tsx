"use client";
import React, { useState } from "react";

import styles from "./trashCan.module.scss";

import { useSelector } from "react-redux";
import { RootState } from "reduxprops/store/store";
import CreateMemo from "@components/CreateMemo/CreateMemo";

const TrashCan = () => {
  const isNone = useSelector((state: RootState) => state.sidebar.isNone);

  return (
    <div className={styles.main_body}>
      {isNone ? (
        <div className={styles.explanation}>
          <div className={`${styles.first_icon} material-symbols-outlined`}>
            delete
          </div>
          <span className={styles.first_text}>
            보관처리된 메모가 여기에 표시됩니다.
          </span>
        </div>
      ) : null}
    </div>
  );
};

export default TrashCan;
