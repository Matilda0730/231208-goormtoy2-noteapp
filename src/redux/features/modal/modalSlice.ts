// redux/features/modalSlice.js

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
  isModalOpen: boolean;
}

const initialState: ModalState = {
  isModalOpen: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    // setOpen: (state, action: PayloadAction<boolean>) => {
    //   state.isModalOpen = action.payload;
    // },
    handleOpenModal: (state) => {
      // setOpen(true);
      state.isModalOpen = true;
    },

    handleCloseModal: (state) => {
      state.isModalOpen = false;
      // setOpen(false);
    },
  },
});

export const { handleOpenModal, handleCloseModal } = modalSlice.actions;
export default modalSlice.reducer;
