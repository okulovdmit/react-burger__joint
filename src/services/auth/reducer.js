import { createSlice } from '@reduxjs/toolkit';
import { getUser } from '@utils/auth-api';

const initialState = {
	user: null,
	isAuth: false,
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload;
		},
		setIsAuth: (state, action) => {
			state.isAuth = action.payload;
		},
	},
	selectors: {
		getUser: (state) => state.user,
		getIsAuth: (state) => state.isAuth,
	},
	extraReducers: (builder) => {
		builder
			.addCase(login.fulfilled, (state, action) => {
				state.user = action.payload;
				state.isAuth = true;
			})
			.addCase(logout.fulfilled, (state) => {
				state.user = null;
			});
	},
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const { getUser, getIsAuth } = userSlice.selectors;
export const { setUser, setIsAuth } = userSlice.actions;
