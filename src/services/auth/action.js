import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUser, login, logout } from '@utils/auth-api';
import { setUser, setIsAuth } from './reducer';

export const login = createAsyncThunk('auth/login', async () => {
	const res = await login();
	return res.user;
});

export const logout = createAsyncThunk('auth/logout', async () => {
	logout();
});

export const checkUserAuth = createAsyncThunk(
	'auth/checkUserAuth',
	async () => {
		async (_, { dispatch }) => {
			if (localStorage.getItem('accesshToken')) {
				getUser()
					.then((res) => dispatch(setUser(res.user)))
					.finally(() => dispatch(setIsAuth('true')));
			} else {
				dispatch(setIsAuth('true'));
			}
		};
	}
);
