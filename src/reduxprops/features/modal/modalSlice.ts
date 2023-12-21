// redux/features/modalSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState {

	isModalOpen: boolean;
	isColorModalVisible: boolean;
	isColorModalToggleVisible: boolean;
	colorModalClose: boolean;
}

const initialState: ModalState = {
	isModalOpen: false,
  isConfirmModalOpen: false,
	isColorModalVisible: false,
	isColorModalToggleVisible: false,
	colorModalClose: false,
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

		openAndCloseColorModal: (state, action) => {
			state.isColorModalToggleVisible = action.payload;
		},
		closeColorModal: (state) => {
			state.colorModalClose = false;
		},
	},
});

export const {
	handleOpenModal,
	handleCloseModal,
  handleOpenConfirmModal,
  handleCloseConfirmModal,
	toggleColorModal,
	openAndCloseColorModal,
	closeColorModal,
} = modalSlice.actions;
export default modalSlice.reducer;
