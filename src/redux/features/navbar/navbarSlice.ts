import { createSlice } from "@reduxjs/toolkit";

interface NavbarState {
	icon: "view_stream" | "grid_view";
	isSidebarOpen: boolean;
}

const initialState: NavbarState = {
	icon: "view_stream",
	isSidebarOpen: false,
};

const navbarSlice = createSlice({
	name: "navbar",
	initialState,
	reducers: {
		toggleIcon: (state) => {
			state.icon = state.icon === "view_stream" ? "grid_view" : "view_stream";
		},
		toggleSidebar: (state) => {
			state.isSidebarOpen = !state.isSidebarOpen;
		},
	},
});

export const { toggleIcon, toggleSidebar } = navbarSlice.actions;
export default navbarSlice.reducer;
