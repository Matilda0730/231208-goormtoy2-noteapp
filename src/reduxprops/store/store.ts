import { configureStore } from "@reduxjs/toolkit";
import authReducer from "reduxprops/features/auth-slice/authSlice";
import navbarReducer from "reduxprops/features/navbar/navbarSlice";
import sidebarReducer from "reduxprops/features/sidebar/sidebarSlice";
import menuReducer from "reduxprops/features/menu/menuSlice";
import modalReducer from "reduxprops/features/modal/modalSlice";
// import notesListReducer from "../redux/features/notesList/notesListSlice";
// import tagsReducer from "../redux/features/tags/tagsSlice";

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    auth: authReducer,
    navbar: navbarReducer,
    sidebar: sidebarReducer,
    modal: modalReducer,
    // notesList: notesListReducer,
    // tags: tagsReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
