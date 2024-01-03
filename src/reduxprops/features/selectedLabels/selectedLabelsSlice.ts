import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SelectedLabelsState {
	selectedLabels: { [key: string]: boolean };
	selectedLabelNames: string[];
}

const initialState: SelectedLabelsState = {
	selectedLabels: {},
	selectedLabelNames: [],
};

const selectedLabelsSlice = createSlice({
	name: "selectedLabels",
	initialState,
	reducers: {
		setSelectedLabelNames: (state, action: PayloadAction<string[]>) => {
			state.selectedLabelNames = action.payload;
		},
		toggleLabel: (state, action: PayloadAction<string>) => {
			const labelId = action.payload;
			// 라벨의 선택 상태 토글
			state.selectedLabels[labelId] = !state.selectedLabels[labelId];
		},
		clearSelectedLabels: (state) => {
			state.selectedLabels = {};
			state.selectedLabelNames = [];
		},
	},
});

export const { toggleLabel, setSelectedLabelNames, clearSelectedLabels } =
	selectedLabelsSlice.actions;
export default selectedLabelsSlice.reducer;
