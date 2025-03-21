import { createAsyncThunk } from '@reduxjs/toolkit';
import { checkUser, api } from '@utils/auth-api';
import { setUser, setIsAuth } from './reducer';

export const register = createAsyncThunk('auth/register', async (user) => {
	return await api.register(user);
});

export const login = createAsyncThunk('auth/login', async () => {
	const res = await api.login();
	return res.user;
});

export const logout = createAsyncThunk('auth/logout', async () => {
	api.logout();
});

export const checkUserAuth = createAsyncThunk(
	'auth/checkUserAuth',
	async () => {
		async (_, { dispatch }) => {
			if (localStorage.getItem('accesshToken')) {
				checkUser()
					.then((res) => dispatch(setUser(res.user)))
					.finally(() => dispatch(setIsAuth('true')));
			} else {
				dispatch(setIsAuth('true'));
			}
		};
	}
);
