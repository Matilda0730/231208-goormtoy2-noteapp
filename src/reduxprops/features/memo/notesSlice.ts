import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Note, NotesState } from "app/models/note";

// 초기 상태
const initialState: NotesState = {
	notes: [],
};

const notesSlice = createSlice({
	name: "notes",
	initialState,
	reducers: {
		addNote: (state, action: PayloadAction<Note>) => {
			state.notes.push(action.payload);
		},
	},
});

export const { addNote } = notesSlice.actions;
export default notesSlice.reducer;
