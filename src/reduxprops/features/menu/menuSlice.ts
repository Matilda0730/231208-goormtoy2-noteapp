import { createSlice } from "@reduxjs/toolkit";
import styles from "../../../app/components/Sidebar/Sidebar.module.scss";

interface SidebarItem {
  name: string;
  iconName: string;
  link: string;
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
    },
    {
      name: "알림",
      iconName: "notifications",
      link: "/notification",
    },
    {
      name: "라벨 수정",
      iconName: "edit",
      link: "/",
    },
    {
      name: "보관처리",
      iconName: "archive",
      link: "/archiveProcessing",
    },
    {
      name: "휴지통",
      iconName: "delete",
      link: "/trashCan",
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
    // : PayloadAction<string>
    setCreatedLabel: (state, action) => {
      const newLabel = {
        name: action.payload,
        iconName: "label",
        link: `/${action.payload}`,
      };
      const updatedLabel = [
        ...state.items.slice(0, 2),
        newLabel,
        ...state.items.slice(2),
      ];
      state.items = updatedLabel;
    },
  },
});

export const { setSelectedItem, setCreatedLabel } = menuSlice.actions;

export default menuSlice.reducer;
