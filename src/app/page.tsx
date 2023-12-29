import { useDispatch, useSelector } from "react-redux";
import CreateMemo from "@components/CreateMemo/CreateMemo";
import { toggleSidebar } from "reduxprops/features/sidebar/sidebarSlice";
import { RootState } from "reduxprops/store/store";
import styles from "./page.module.scss";
import "./globals.scss";
import { Note } from "app/models/note";
import MemosDisplay from "@components/CreateMemo/MemosDisplay";

export default function Home() {
	return (
		<div className={styles.main_body}>
			<CreateMemo />
			<MemosDisplay />
		</div>
	);
}
