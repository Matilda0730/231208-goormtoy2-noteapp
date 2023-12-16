import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
	isAuth: boolean;
	username: string;
	uid: string;
	isModerator: boolean;
};

type InitialState = {
	value: AuthState;
};

const initialState: InitialState = {
	value: {
		isAuth: false,
		username: "",
		uid: "",
		isModerator: false,
	} as AuthState,
} as InitialState;

export const auth = createSlice({
	name: "auth",
	initialState,
	reducers: {
		logOut: () => {
			return initialState;
		},
		login: (state, action: PayloadAction<string>) => {
			return {
				value: {
					isAuth: true,
					username: action.payload,
					uid: "dsafdsf332",
					isModerator: false,
				},
			};
		},
	},
});

export const { login, logOut } = auth.actions;
export default auth.reducer;
