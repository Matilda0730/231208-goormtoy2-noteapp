import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth-slice/authSlice";
import navbarReducer from "./features/navbar/navbarSlice";
import sidebarReducer from "./features/sidebar/sidebarSlice";
import menuReducer from "./features/menu/menuSlice";
// import menuReducer from "../redux/features/menu/menuSlice";
// import modalReducer from "../redux/features/modal/modalSlice";
// import notesListReducer from "../redux/features/notesList/notesListSlice";
// import tagsReducer from "../redux/features/tags/tagsSlice";

export const store = configureStore({
	reducer: {
		menu: menuReducer,
		auth: authReducer,
		navbar: navbarReducer,
		sidebar: sidebarReducer,
		// menu: menuReducer,
		// modal: modalReducer,
		// notesList: notesListReducer,
		// tags: tagsReducer,
	},
	devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
