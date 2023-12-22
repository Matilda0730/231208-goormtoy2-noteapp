import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import styles from "../../../app/components/Sidebar/Sidebar.module.scss";

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
      link: "/notification",
      id: "notification",
    },
    {
      name: "라벨 수정",
      iconName: "edit",
      link: "/",
      id: "label",
    },
    {
      name: "보관처리",
      iconName: "archive",
      link: "/archiveProcessing",
      id: "archiveProcessing",
    },
    {
      name: "휴지통",
      iconName: "delete",
      link: "/trashCan",
      id: "trashCan",
    },
  ],
  selectedItem: localStorage.getItem("selectedItemName") || "Keep",
  newLabelSpace: [],
  errorMessage: null,
  labelToDelete: null,
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
        link: `/label/${action.payload}`,
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
    deleteLabel: (state, action) => {
      state.newLabelSpace = state.newLabelSpace
        .filter((label) => label.id !== action.payload)
        .sort((a, b) => a.name.localeCompare(b.name));

      state.items = [
        ...state.items.slice(0, 2),
        ...state.items.slice(2 + state.newLabelSpace.length),
      ];

      state.items = [
        ...state.items.slice(0, 2),
        ...state.newLabelSpace,
        ...state.items.slice(2),
      ];
    },

    setLabelToDelete: (state, action) => {
      console.log("라벨 삭제 중:", action.payload);
      state.labelToDelete = action.payload;
      console.log("삭제 후 업데이트된 상태:", state);
    },
  },
});

export const {
  setSelectedItem,
  setCreatedLabel,
  deleteLabel,
  setLabelToDelete,
} = menuSlice.actions;

export default menuSlice.reducer;
