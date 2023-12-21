// redux/features/modalSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
  isModalOpen: boolean;
  isConfirmModalOpen: boolean;
  isColorModalVisible: boolean;
}

const initialState: ModalState = {
  isModalOpen: false,
  isConfirmModalOpen: false,
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
    handleOpenConfirmModal: (state) => {
      state.isConfirmModalOpen = true;
    },
    handleCloseConfirmModal: (state) => {
      state.isConfirmModalOpen = false;
    },
    toggleColorModal: (state) => {
      state.isColorModalVisible = !state.isColorModalVisible;
    },
  },
});

export const {
  handleOpenModal,
  handleCloseModal,
  handleOpenConfirmModal,
  handleCloseConfirmModal,
  toggleColorModal,
} = modalSlice.actions;
export default modalSlice.reducer;
