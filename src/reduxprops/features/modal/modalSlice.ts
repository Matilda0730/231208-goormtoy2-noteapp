// redux/features/modalSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
  isModalOpen: boolean;
  isColorModalVisible: boolean;
}

const initialState: ModalState = {
  isModalOpen: false,
  isColorModalVisible: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    handleOpenModal: (state) => {
      state.isModalOpen = true;
    },

    handleCloseModal: (state) => {
      state.isModalOpen = false;
    },

    toggleColorModal: (state) => {
      state.isColorModalVisible = !state.isColorModalVisible;
    },
  },
});

export const { handleOpenModal, handleCloseModal, toggleColorModal } =
  modalSlice.actions;
export default modalSlice.reducer;
