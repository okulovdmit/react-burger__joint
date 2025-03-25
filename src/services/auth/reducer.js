import { createSlice } from '@reduxjs/toolkit';
import { register, login, logout, updateData } from './action';

const initialState = {
	user: null,
	loading: false,
	error: null,
	isAuthChecked: false,
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload;
		},
		setIsAuthChecked: (state, action) => {
			state.isAuthChecked = action.payload;
		},
	},
	selectors: {
		getUser: (state) => state.user,
		getUserLoading: (state) => state.loading,
		getIsAuthChecked: (state) => state.isAuthChecked,
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
			.addCase(login.pending, (state) => {
				state.loading = true;
			})
			.addCase(login.rejected, (state, action) => {
				state.error = action.error?.message;
				state.loading = false;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.user = action.payload;
				state.isAuthChecked = true;
			})
			.addCase(logout.pending, (state) => {
				state.loading = true;
			})
			.addCase(logout.rejected, (state, action) => {
				state.error = action.error?.message;
				state.loading = false;
			})
			.addCase(logout.fulfilled, (state) => {
				state.user = null;
				state.loading = false;
			})
			.addCase(updateData.pending, (state) => {
				state.loading = true;
			})
			.addCase(updateData.rejected, (state, action) => {
				state.error = action.error?.message;
				state.loading = false;
			})
			.addCase(updateData.fulfilled, (state, action) => {
				state.user = action.payload;
				state.loading = false;
			});
	},
});

export const { getUser, getUserLoading, getIsAuthChecked } =
	userSlice.selectors;
export const { setUser, setIsAuthChecked } = userSlice.actions;
