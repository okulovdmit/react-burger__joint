export const BURGER_API_URL = 'https://norma.nomoreparties.space/api';

export const getResponse = (res) => {
	return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};
