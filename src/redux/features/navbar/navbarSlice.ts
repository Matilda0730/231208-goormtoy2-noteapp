import { createSlice } from "@reduxjs/toolkit";

interface NavbarState {
	icon: "view_stream" | "grid_view";
}

const initialState: NavbarState = {
	icon: "view_stream",
};

const navbarSlice = createSlice({
	name: "navbar",
	initialState,
	reducers: {
		toggleIcon: (state) => {
			state.icon = state.icon === "view_stream" ? "grid_view" : "view_stream";
		},
	},
});

export const { toggleIcon } = navbarSlice.actions;
export default navbarSlice.reducer;
