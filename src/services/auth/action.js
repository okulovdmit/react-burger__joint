import { createAsyncThunk } from '@reduxjs/toolkit';
import { checkUser, updateUserData, api } from '../../utils/auth-api';
import { setUser, setIsAuthChecked } from './reducer';

export const register = createAsyncThunk('auth/register', async (user) => {
	return await api.register(user);
});

export const login = createAsyncThunk('auth/login', async (user) => {
	return await api.login(user);
});

export const logout = createAsyncThunk('auth/logout', async () => {
	api.logout();
});
export const updateData = createAsyncThunk('auth/changeData', async (data) => {
	return await updateUserData(data);
});

export const checkUserAuth = createAsyncThunk(
	'auth/checkUserAuth',
	async (_, { dispatch }) => {
		if (localStorage.getItem('accessToken')) {
			checkUser()
				.then((res) => dispatch(setUser(res.user)))
				.finally(() => dispatch(setIsAuthChecked(true)));
		} else {
			dispatch(setIsAuthChecked(true));
		}
	}
);
