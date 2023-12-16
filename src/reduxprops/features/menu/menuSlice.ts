import { createSlice } from "@reduxjs/toolkit";
import styles from "../../../app/components/Sidebar/Sidebar.module.scss";

interface SidebarItem {
	name: string;
	iconName: string;
	link: string;
	textClass: string;
}

interface SidebarState {
	items: SidebarItem[];
	selectedItem: string;
}

const initialState: SidebarState = {
	items: [
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
	],
	selectedItem: localStorage.getItem("selectedItemName") || "Keep",
};

const menuSlice = createSlice({
	name: "menu",
	initialState,
	reducers: {
		setSelectedItem: (state, action) => {
			state.selectedItem = action.payload;
		},
	},
});

export const { setSelectedItem } = menuSlice.actions;

export default menuSlice.reducer;
