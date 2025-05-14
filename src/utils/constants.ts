export const BURGER_API_URL = 'https://norma.nomoreparties.space/api';

export const WS_ORDERS_URL = 'wss://norma.nomoreparties.space/orders/all';
export const WS_PROFILE_ORDERS_URL = 'wss://norma.nomoreparties.space/orders';

export const getResponse = <T>(res: Response): Promise<T> => {
	return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const request = <T>(endpoint: string, options?: RequestInit) => {
	return fetch(`${BURGER_API_URL}${endpoint}`, options).then(getResponse<T>);
};
