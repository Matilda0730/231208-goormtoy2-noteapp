// redux/features/modalSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
	isModalOpen: boolean;
	isConfirmModalOpen: boolean;
	isColorModalVisible: boolean;
	isColorModalToggleVisible: boolean;
	colorModalClose: boolean;
	isPaletteModalOpen: boolean;
	paletteModalToggle: boolean;
	modalBackgroundColor: string;
}

const initialState: ModalState = {
	isModalOpen: false,
	isConfirmModalOpen: false,
	isColorModalVisible: false,
	isColorModalToggleVisible: false,
	colorModalClose: false,
	isPaletteModalOpen: false,
	paletteModalToggle: false,
	modalBackgroundColor: "#232427",
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

		togglePaletteModal: (state) => {
			state.paletteModalToggle = !state.paletteModalToggle;
		},

		setBackgroundColor: (state, action: PayloadAction<string>) => {
			state.modalBackgroundColor = action.payload;
		},
	},
});

export const {
	handleOpenModal,
	handleCloseModal,
	handleOpenConfirmModal,
	handleCloseConfirmModal,
	togglePaletteModal,
	setBackgroundColor,
} = modalSlice.actions;
export default modalSlice.reducer;
