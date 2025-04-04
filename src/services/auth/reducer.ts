import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { register, login, logout, updateData } from './action';
import { TUserWithoutPassword } from '@utils/types';

interface IUserState {
	user: TUserWithoutPassword | null;
	loading: boolean;
	error: string | null;
	isAuthChecked: boolean;
}

const initialState: IUserState = {
	user: null,
	loading: false,
	error: null,
	isAuthChecked: false,
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<TUserWithoutPassword>) => {
			state.user = action.payload;
		},
		setIsAuthChecked: (state, action: PayloadAction<boolean>) => {
			state.isAuthChecked = action.payload;
		},
		clearError: (state) => {
			state.error = null;
		},
	},
	selectors: {
		getUser: (state) => state.user,
		getUserLoading: (state) => state.loading,
		getError: (state) => state.error,
		getIsAuthChecked: (state) => state.isAuthChecked,
	},
	extraReducers: (builder) => {
		builder
			.addCase(register.pending, (state) => {
				state.loading = true;
			})
			.addCase(register.rejected, (state, action) => {
				state.error = action.error?.message || null;
				state.loading = false;
			})
			.addCase(register.fulfilled, (state) => {
				state.error = null;
			})
			.addCase(login.pending, (state) => {
				state.loading = true;
			})
			.addCase(login.rejected, (state, action) => {
				state.error = action.error?.message || null;
				state.loading = false;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.user = action.payload;
				state.loading = false;
				state.isAuthChecked = true;
				state.error = null;
			})
			.addCase(logout.pending, (state) => {
				state.loading = true;
			})
			.addCase(logout.rejected, (state, action) => {
				state.error = action.error?.message || null;
				state.loading = false;
			})
			.addCase(logout.fulfilled, (state) => {
				state.user = null;
				state.loading = false;
				state.error = null;
			})
			.addCase(updateData.pending, (state) => {
				state.loading = true;
			})
			.addCase(updateData.rejected, (state, action) => {
				state.error = action.error?.message || null;
				state.loading = false;
			})
			.addCase(updateData.fulfilled, (state, action) => {
				state.user = action.payload;
				state.loading = false;
			});
	},
});

export const { getUser, getUserLoading, getError, getIsAuthChecked } =
	userSlice.selectors;
export const { setUser, setIsAuthChecked, clearError } = userSlice.actions;
