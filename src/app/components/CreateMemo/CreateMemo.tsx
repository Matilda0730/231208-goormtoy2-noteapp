import React from "react";
import styles from "./CreateMemo.module.scss";

const CreateMemo = () => {
  return (
    <div className={styles.create_space}>
      <div className={styles.create_space_inner}>메모작성...</div>
      <div className={`material-symbols-outlined`}>check_box</div>
      <div className={`material-symbols-outlined`}>label</div>
      <div className={`material-symbols-outlined`}>more_horiz</div>
    </div>
  );
};

export default CreateMemo;
