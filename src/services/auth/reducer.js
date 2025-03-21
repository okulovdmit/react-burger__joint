import { createSlice } from '@reduxjs/toolkit';
import { register, login, logout } from './action';

const initialState = {
	user: null,
	loading: false,
	error: null,
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
		getUserLoading: (state) => state.loading,
		getIsAuth: (state) => state.isAuth,
	},
	extraReducers: (builder) => {
		builder
			.addCase(register.pending, (state) => {
				state.loading = true;
			})
			.addCase(register.rejected, (state, action) => {
				state.error = action.error?.message;
				state.loading = false;
			})
			.addCase(register.fulfilled, (state, action) => {
				state.user = action.payload;
				state.loading = false;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.user = action.payload;
				state.isAuth = true;
			})
			.addCase(logout.fulfilled, (state) => {
				state.user = null;
			});
	},
});

export const { getUser, getUserLoading, getIsAuth } = userSlice.selectors;
export const { setUser, setIsAuth } = userSlice.actions;
