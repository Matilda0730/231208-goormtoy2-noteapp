import CreateMemo from "@components/CreateMemo/CreateMemo";
import styles from "./page.module.scss";
import "./globals.scss";
import MemosDisplay from "@components/CreateMemo/MemosDisplay";

export default function Home() {
  return (
    <div className={styles.main_body}>
      <CreateMemo />
      <MemosDisplay />
    </div>
  );
}
