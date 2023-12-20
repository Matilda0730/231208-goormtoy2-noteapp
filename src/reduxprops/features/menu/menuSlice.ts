import { createSlice } from "@reduxjs/toolkit";
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
  },
});

export const { setSelectedItem, setCreatedLabel } = menuSlice.actions;

export default menuSlice.reducer;
