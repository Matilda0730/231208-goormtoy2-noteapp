// redux/features/modalSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalLabel {
  name: string;
  link: string;
  id: string;
}

interface ModalState {
  isModalOpen: boolean;
  labels: ModalLabel[];
}

const initialState: ModalState = {
  isModalOpen: false,
  labels: [],
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
        link: action.payload,
        id: action.payload,
      };
      state.labels = [...state.labels, newLabel].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    },
    deleteLabel: (state, action: PayloadAction<string>) => {
      state.labels = state.labels.filter(
        (label) => label.name !== action.payload
      );
    },
  },
});

export const { handleOpenModal, handleCloseModal, setNewLabels, deleteLabel } =
  modalSlice.actions;
export default modalSlice.reducer;
