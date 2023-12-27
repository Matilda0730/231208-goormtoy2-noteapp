import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import styles from "../../../app/components/Sidebar/Sidebar.module.scss";
import LabelItem from "app/models/labelItem";
import { usePathname, redirect } from "next/navigation";
interface SidebarItem {
	name: string;
	iconName: string;
	link: string;
	id: string;
}

interface SidebarState {
	items: SidebarItem[];
	selectedItem: string;
	newLabelSpace: SidebarItem[];
	errorMessage: string | null;
	labelToDelete: string | null;
	labelToEdit: LabelItem | null;
	selectedMenu: string | null;
	mergeFlag: boolean;
	mergeToExisted: string | null;
	existedLabel: string | null;
	labelDeleted: boolean;
}

const initialState: SidebarState = {
	items: [
		{
			name: "메모",
			iconName: "lightbulb",
			link: "/",
			id: "memo",
		},
		{
			name: "알림",
			iconName: "notifications",
			link: "/pages/notification",
			id: "notification",
		},
		{
			name: "라벨 수정",
			iconName: "edit",
			link: "/pages/edit",
			id: "label",
		},
		{
			name: "보관처리",
			iconName: "archive",
			link: "/pages/archiveProcessing",
			id: "archiveProcessing",
		},
		{
			name: "휴지통",
			iconName: "delete",
			link: "/pages/trashCan",
			id: "trashCan",
		},
	],
	selectedItem: localStorage.getItem("selectedItemName") || "Keep",
	newLabelSpace: [],
	errorMessage: null,
	labelToDelete: null,
	labelToEdit: null,
	selectedMenu: "/",
	mergeFlag: false,
	mergeToExisted: null,
	existedLabel: null,
	labelDeleted: false,
};

const menuSlice = createSlice({
	name: "menu",
	initialState,
	reducers: {
		setSelectedItem: (state, action) => {
			state.selectedItem = action.payload;
		},
		setCreatedLabel: (state, action) => {
			const newLabelName = action.payload;
			if (state.newLabelSpace.some((label) => label.name === newLabelName)) {
				state.errorMessage = "이미 존재하는 이름입니다.";
				return;
			}
			state.errorMessage = null;
			const newLabel = {
				name: action.payload,
				iconName: "label",
				link: `/pages/label/${action.payload}`,
				id: action.payload,
			};
			state.items = [
				...state.items.slice(0, 2),
				...state.items.slice(2 + state.newLabelSpace.length),
			];

			state.newLabelSpace = [...state.newLabelSpace, newLabel];

			const updatedLabels = [
				...state.items.slice(0, 2),
				...state.newLabelSpace.sort((a, b) => a.name.localeCompare(b.name)),
				...state.items.slice(2),
			];

			state.items = updatedLabels;
		},
		setLabelToDelete: (state, action) => {
			const labelId = action.payload;
			state.labelToDelete = labelId;
		},
		deleteLabel: (state, action) => {
			state.newLabelSpace = state.newLabelSpace.filter(
				(label) => label.id !== action.payload
			);
			state.items = state.items.filter((item) => item.id !== action.payload);
			const labelId = action.payload;

			if (window.location.href.includes(`/pages/label/${labelId}`)) {
				state.selectedMenu = "/";
				window.history.pushState(null, "", "/");
			}
			state.labelDeleted = true;
		},
		setLabelToUpdate: (state, action) => {
			const label = action.payload;
			state.labelToEdit = label;
		},
		updateLabel: (state, action) => {
			const updatedLabel: SidebarItem = action.payload;
			const originalLabel = state.labelToEdit;

			const existingLabel = state.newLabelSpace.find((label) => label.id === updatedLabel.id);
			if (existingLabel) {
				state.mergeToExisted = updatedLabel.id;
				state.existedLabel = existingLabel.id;
				state.mergeFlag = true;

				console.log(`${originalLabel!.id}을 ${existingLabel.id}으로 병합 시도!`);
				return;
			}

			state.newLabelSpace = state.newLabelSpace
				.map((label) => {
					return label.id === originalLabel!.id ? updatedLabel : label;
				})
				.sort((a, b) => a.name.localeCompare(b.name));

			const updatedLabels = [
				...state.items.slice(0, 2),
				...state.newLabelSpace,
				...state.items.slice(2 + state.newLabelSpace.length),
			];

			state.items = updatedLabels;
		},
		setSelectedMenu: (state, action) => {
			state.selectedMenu = action.payload;
		},
		resetLabelDeleted: (state) => {
			state.labelDeleted = false;
		},
	},
});

export const {
	setSelectedItem,
	setCreatedLabel,
	deleteLabel,
	updateLabel,
	setLabelToDelete,
	setLabelToUpdate,
	setSelectedMenu,
	resetLabelDeleted,
} = menuSlice.actions;

export default menuSlice.reducer;
