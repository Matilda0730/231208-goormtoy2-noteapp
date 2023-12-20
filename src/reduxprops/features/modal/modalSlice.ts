// redux/features/modalSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalLabel {
	name: string;
}

interface ModalState {
	isModalOpen: boolean;
	labels: ModalLabel[];
	isColorModalVisible: boolean;
}

const initialState: ModalState = {
	isModalOpen: false,
	labels: [],
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

		setNewLabels: (state, action: PayloadAction<string>) => {
			const newLabel: ModalLabel = {
				name: action.payload,
			};
			state.labels = [...state.labels, newLabel];
			console.log(state.labels);
		},

		toggleColorModal: (state) => {
			state.isColorModalVisible = !state.isColorModalVisible;
		},
	},
});

export const { handleOpenModal, handleCloseModal, setNewLabels, toggleColorModal } =
	modalSlice.actions;
export default modalSlice.reducer;
