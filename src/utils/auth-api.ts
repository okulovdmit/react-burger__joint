import { BURGER_API_URL, getResponse } from './constants';
import {
	TUser,
	TAuthData,
	TResetPasswordData,
	TUserWithoutPassword,
} from './types';

const refreshToken = async (): Promise<TAuthData> => {
	try {
		const response = await fetch(`${BURGER_API_URL}/auth/token`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
			body: JSON.stringify({
				token: localStorage.getItem('refreshToken'),
			}),
		});
		const refreshData = await getResponse<TAuthData>(response);
		if (!refreshData.success) {
			localStorage.removeItem('accessToken');
			localStorage.removeItem('refreshToken');
			return Promise.reject(new Error(refreshData.message));
		}
		if (refreshData.refreshToken && refreshData.accessToken) {
			localStorage.setItem('refreshToken', refreshData.refreshToken);
			localStorage.setItem('accessToken', refreshData.accessToken);
		}
		return refreshData;
	} catch (err) {
		localStorage.removeItem('accessToken');
		localStorage.removeItem('refreshToken');
		return Promise.reject(err);
	}
};

const fetchWithRefresh = async <T>(
	url: string,
	options: RequestInit
): Promise<T> => {
	try {
		const res = await fetch(url, options);
		return await getResponse<T>(res);
	} catch (err) {
		if (err instanceof TypeError && err.message === 'jwt expired') {
			const refreshData = await refreshToken();
			options.headers = {
				...options.headers,
				authorization: refreshData.accessToken || '',
			};
			const res = await fetch(url, options);
			return await getResponse<T>(res);
		} else {
			return Promise.reject(err);
		}
	}
};

export const checkUser = async (): Promise<TUserWithoutPassword> => {
	const url = `${BURGER_API_URL}/auth/user`;
	const options = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
			authorization: localStorage.getItem('accessToken') || '',
		},
	};

	const request = await fetchWithRefresh<TUserWithoutPassword>(url, options);

	try {
		return request;
	} catch (error) {
		localStorage.removeItem('accessToken');
		localStorage.removeItem('refreshToken');
		throw error;
	}
};

const register = async ({
	email,
	password,
	name,
}: TUser): Promise<TAuthData> => {
	return fetch(`${BURGER_API_URL}/auth/register`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json;charset=utf-8' },
		body: JSON.stringify({
			email: email,
			password: password,
			name: name,
		}),
	})
		.then(getResponse<TAuthData>)
		.then((data) => {
			if (data.success && data.accessToken && data.refreshToken) {
				localStorage.setItem('accessToken', data.accessToken);
				localStorage.setItem('refreshToken', data.refreshToken);
			}
			return data;
		});
};

const login = async ({ email, password }: TUser): Promise<TAuthData> => {
	return fetch(`${BURGER_API_URL}/auth/login`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json;charset=utf-8' },
		body: JSON.stringify({
			email: email,
			password: password,
		}),
	})
		.then(getResponse<TAuthData>)
		.then((data) => {
			if (data.success && data.accessToken && data.refreshToken) {
				localStorage.setItem('accessToken', data.accessToken);
				localStorage.setItem('refreshToken', data.refreshToken);
			}
			return data;
		});
};

const logout = async (): Promise<TAuthData> => {
	return fetch(`${BURGER_API_URL}/auth/logout`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
	})
		.then(getResponse<TAuthData>)
		.then((data) => {
			if (data.success) {
				localStorage.removeItem('accessToken');
				localStorage.removeItem('refreshToken');
			}
			return data;
		});
};

const forgotPassword = async ({
	email,
}: {
	email: string;
}): Promise<TAuthData> => {
	return fetch(`${BURGER_API_URL}/password-reset`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json;charset=utf-8' },
		body: JSON.stringify({
			email: email,
		}),
	})
		.then(getResponse<TAuthData>)
		.then((data) => {
			if (data.success) {
				localStorage.setItem('getResetPassword', 'true');
			}
			return data;
		});
};

const resetPassword = async ({
	password,
	token,
}: TResetPasswordData): Promise<TAuthData> => {
	return fetch(`${BURGER_API_URL}/password-reset/reset`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json;charset=utf-8' },
		body: JSON.stringify({
			password: password,
			token: token,
		}),
	})
		.then(getResponse<TAuthData>)
		.then((data) => {
			if (data.success) {
				localStorage.removeItem('getResetPassword');
			}
			return data;
		});
};

export const updateUserData = async ({
	name,
	email,
}: TUser): Promise<TAuthData> => {
	return fetch(`${BURGER_API_URL}/auth/user`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
			authorization: localStorage.getItem('accessToken') || '',
		},
		body: JSON.stringify({
			name: name,
			email: email,
		}),
	})
		.then(getResponse<TAuthData>)
		.then((data) => data);
};

export { forgotPassword, resetPassword };
export const api = {
	register,
	login,
	logout,
};
