import { configureStore } from "@reduxjs/toolkit";
import authReducer from "reduxprops/features/auth-slice/authSlice";
import navbarReducer from "reduxprops/features/navbar/navbarSlice";
import sidebarReducer from "reduxprops/features/sidebar/sidebarSlice";
import menuReducer from "reduxprops/features/menu/menuSlice";
import modalReducer from "reduxprops/features/modal/modalSlice";
import notesListReducer from "reduxprops/features/memo/notesSlice";
import selectedLabelsReducer from "reduxprops/features/selectedLabels/selectedLabelsSlice";

export const store = configureStore({
	reducer: {
		menu: menuReducer,
		auth: authReducer,
		navbar: navbarReducer,
		sidebar: sidebarReducer,
		modal: modalReducer,
		notes: notesListReducer,
		selectedLabels: selectedLabelsReducer,
	},
	devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
