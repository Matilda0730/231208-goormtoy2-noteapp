// redux/features/modalSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
  isModalOpen: boolean;
  isConfirmModalOpen: boolean;
  isConfirmEditModalOpen: boolean;
  isNoteModalOpen: boolean;
  isColorModalVisible: boolean;
  isColorModalToggleVisible: boolean;
  colorModalClose: boolean;
  isPaletteModalOpen: boolean;
  paletteModalToggle: boolean;
  modalBackgroundColor: string;
  memoLabelModalToggle: boolean;
}

const initialState: ModalState = {
  isModalOpen: false,
  isConfirmModalOpen: false,
  isConfirmEditModalOpen: false,
  isNoteModalOpen: false,
  isColorModalVisible: false,
  isColorModalToggleVisible: false,
  colorModalClose: false,
  isPaletteModalOpen: false,
  paletteModalToggle: false,
  modalBackgroundColor: "#202124",
  memoLabelModalToggle: false,
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
    handleOpenEditConfirmModal: (state) => {
      state.isConfirmEditModalOpen = true;
    },
    handleCloseEditConfirmModal: (state) => {
      state.isConfirmEditModalOpen = false;
    },
    handleOpenNoteModal: (state) => {
      state.isNoteModalOpen = true;
    },
    handleCloseNoteModal: (state) => {
      state.isNoteModalOpen = false;
    },
    togglePaletteModal: (state) => {
      state.paletteModalToggle = !state.paletteModalToggle;
    },

    setBackgroundColor: (state, action: PayloadAction<string>) => {
      state.modalBackgroundColor = action.payload;
    },

    toggleMemoLabelModal: (state) => {
      state.memoLabelModalToggle = !state.memoLabelModalToggle;
    },

    CloseMemoLabelModal: (state, action: PayloadAction<boolean>) => {
      state.memoLabelModalToggle = action.payload;
    },
  },
});

export const {
  handleOpenModal,
  handleCloseModal,
  handleOpenConfirmModal,
  handleCloseConfirmModal,
  handleOpenEditConfirmModal,
  handleCloseEditConfirmModal,
  handleOpenNoteModal,
  handleCloseNoteModal,
  togglePaletteModal,
  setBackgroundColor,
  toggleMemoLabelModal,
  CloseMemoLabelModal,
} = modalSlice.actions;
export default modalSlice.reducer;
