import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Note, NotesState } from "app/models/note";

// 초기 상태
const initialState: NotesState = {
  notes: [],
  trashCan: [],
  archiveList: [],
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<Note>) => {
      state.notes.splice(0, 0, action.payload);
    },
    moveToTrashCan: (state, action) => {
      state.trashCan.push(action.payload);
      state.notes = state.notes.filter((note) => note.id !== action.payload.id);
      state.archiveList = state.archiveList.filter(
        (note) => note.id !== action.payload.id
      );
    },
    moveToArchive: (state, action) => {
      state.archiveList.push(action.payload);
      state.notes = state.notes.filter((note) => note.id !== action.payload.id);
    },
    moveBack: (state, action) => {
      state.notes.push(action.payload);
      state.trashCan = state.trashCan.filter(
        (note) => note.id !== action.payload.id
      );
      state.archiveList = state.archiveList.filter(
        (note) => note.id !== action.payload.id
      );
      state.notes = state.notes.map((note) => {
        if (note.id === action.payload.id) {
          return { ...note, isPinned: false };
        }
        return note;
      });
    },
    deleteNote: (state, action) => {
      state.trashCan = state.trashCan.filter(
        (note) => note.id !== action.payload
      );
    },
    actualPinToggle: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.map((note) =>
        action.payload === note.id
          ? { ...note, isPinned: !note.isPinned }
          : note
      );
    },
  },
});

export const {
  addNote,
  moveToTrashCan,
  moveToArchive,
  moveBack,
  deleteNote,
  actualPinToggle,
} = notesSlice.actions;
export default notesSlice.reducer;
