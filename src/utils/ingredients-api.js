import { BURGER_API_URL, getResponse } from './constants';

export const getIngredients = async () => {
	return fetch(`${BURGER_API_URL}/ingredients`, {
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
	}).then(getResponse);
};

export const getNumber = async (ingredientIds) => {
	return fetch(`${BURGER_API_URL}/orders`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
			authorization: localStorage.getItem('accessToken'),
		},
		body: JSON.stringify({ ingredients: ingredientIds }),
	}).then(getResponse);
};
