import { createAsyncThunk } from '@reduxjs/toolkit';
import { checkUser, updateUserData, api } from '../../utils/auth-api';
import { setUser, setIsAuthChecked } from './reducer';
import { TAuthData, TUser } from '@utils/types';
import { ThunkApiConfig } from '@services/ingredients/action';

export const register = createAsyncThunk<TAuthData, TUser, ThunkApiConfig>(
	'auth/register',
	async (user) => {
		return await api.register(user);
	}
);

export const login = createAsyncThunk<TAuthData, TUser, ThunkApiConfig>(
	'auth/login',
	async (user) => {
		return await api.login(user);
	}
);

export const logout = createAsyncThunk<void, void, ThunkApiConfig>(
	'auth/logout',
	async () => {
		api.logout();
	}
);
export const updateData = createAsyncThunk<TAuthData, TUser, ThunkApiConfig>(
	'auth/changeData',
	async (data: TUser) => {
		return await updateUserData(data);
	}
);

export const checkUserAuth = createAsyncThunk<void, void, ThunkApiConfig>(
	'auth/checkUserAuth',
	async (_, { dispatch }) => {
		if (localStorage.getItem('accessToken')) {
			checkUser()
				.then((res) => dispatch(setUser(res)))
				.finally(() => dispatch(setIsAuthChecked(true)));
		} else {
			dispatch(setIsAuthChecked(true));
		}
	}
);
