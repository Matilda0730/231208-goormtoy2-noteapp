import { createSlice } from "@reduxjs/toolkit";

interface SidebarState {
	isSidebarOpen: boolean;
	isNone: boolean;
}

const initialState: SidebarState = {
	isSidebarOpen: false,
	isNone: true,
};

const sidebarSlice = createSlice({
	name: "sidebar",
	initialState,
	reducers: {
		toggleSidebar: (state) => {
			state.isSidebarOpen = !state.isSidebarOpen;
		},
		toggleIsNone: (state) => {
			state.isNone = !state.isNone;
		},
	},
});

export const { toggleSidebar, toggleIsNone } = sidebarSlice.actions;
export default sidebarSlice.reducer;
