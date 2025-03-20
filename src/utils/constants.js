export const BURGER_API_URL = 'https://norma.nomoreparties.space/api';

export const getResponse = (res) => {
	if (res.ok) {
		return res.json();
	}

	return Promise.reject(`Ошибка ${res.status}`);
};
