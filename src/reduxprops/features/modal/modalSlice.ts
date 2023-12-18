// redux/features/modalSlice.js

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
  isModalOpen: boolean;
  labels: string[];
}

const initialState: ModalState = {
  isModalOpen: false,
  labels: [],
};

interface ModalLabel {
  name: string;
}

interface ModalLabels {
  labels: ModalLabel[];
}

const labelsOnModal: ModalLabels = {
  labels: [],
};

const modalSlice = createSlice({
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
      // setOpen(false);
      state.isModalOpen = false;
    },
    setNewLabels: (state, action) => {
      const newLabel = {
        name: action.payload,
      };
      labelsOnModal.labels.push(newLabel);
      console.log(labelsOnModal.labels);
    },
    // getLabels: (state) => {
    //   return { ...state, labels: labelsOnModal.labels };
    // }
  },
});

export const { handleOpenModal, handleCloseModal, setNewLabels } =
  modalSlice.actions;
export default modalSlice.reducer;
