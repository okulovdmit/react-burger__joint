import { BURGER_API_URL, getResponse } from './constants';

const refreshToken = async () => {
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
		const refreshData = await getResponse(response);
		if (!refreshData.success) {
			localStorage.removeItem('accessToken');
			localStorage.removeItem('refreshToken');
			return Promise.reject(new Error(refreshData.message));
		}
		localStorage.setItem('refreshToken', refreshData.refreshToken);
		localStorage.setItem('accessToken', refreshData.accessToken);
		return refreshData;
	} catch (err) {
		localStorage.removeItem('accessToken');
		localStorage.removeItem('refreshToken');
		return Promise.reject(err);
	}
};

const fetchWithRefresh = async (url, options) => {
	try {
		const res = await fetch(url, options);
		return await getResponse(res);
	} catch (err) {
		if (err.message === 'jwt expired') {
			const refreshData = await refreshToken();
			options.headers.authorization = refreshData.accessToken;
			const res = await fetch(url, options);
			return await getResponse(res);
		} else {
			return Promise.reject(err);
		}
	}
};

export const checkUser = async () => {
	const url = `${BURGER_API_URL}/auth/user`;
	const options = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
			authorization: localStorage.getItem('accessToken'),
		},
	};

	const request = await fetchWithRefresh(url, options);

	try {
		return request;
	} catch (error) {
		localStorage.removeItem('accessToken');
		localStorage.removeItem('refreshToken');
		throw error;
	}
};

const register = async ({ email, password, name }) => {
	return fetch(`${BURGER_API_URL}/auth/register`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json;charset=utf-8' },
		body: JSON.stringify({
			email: email,
			password: password,
			name: name,
		}),
	})
		.then(getResponse)
		.then((data) => {
			if (data.success) {
				localStorage.setItem('accessToken', data.accessToken);
				localStorage.setItem('refreshToken', data.refreshToken);
			}
			return data.user;
		});
};

const login = async ({ email, password }) => {
	return fetch(`${BURGER_API_URL}/auth/login`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json;charset=utf-8' },
		body: JSON.stringify({
			email: email,
			password: password,
		}),
	})
		.then(getResponse)
		.then((data) => {
			if (data.success) {
				localStorage.setItem('accessToken', data.accessToken);
				localStorage.setItem('refreshToken', data.refreshToken);
			}
			return data.user;
		});
};

const logout = async () => {
	return fetch(`${BURGER_API_URL}/auth/logout`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
			authorization: localStorage.getItem('refreshToken'),
		},
	})
		.then(getResponse)
		.then((data) => {
			if (data.success) {
				localStorage.removeItem('accessToken', data.accessToken);
				localStorage.removeItem('refreshToken', data.refreshToken);
			}
			return data;
		});
};

export const api = {
	register,
	login,
	logout,
};
