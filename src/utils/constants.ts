export const BURGER_API_URL = 'https://norma.nomoreparties.space/api';

export const WS_ORDERS_URL = 'wss://norma.nomoreparties.space/orders/all';

export const getResponse = <T>(res: Response): Promise<T> => {
	return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};
