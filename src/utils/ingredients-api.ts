import { BURGER_API_URL, getResponse } from './constants';
import { TDataIngredient } from './types';

type TGetNumber = {
	name: string;
	order: {
		number: number;
	};
	success: boolean;
};

export const getIngredients = async (): Promise<{
	data: TDataIngredient[];
}> => {
	return fetch(`${BURGER_API_URL}/ingredients`, {
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
	}).then(getResponse<{ data: TDataIngredient[] }>);
};

export const getNumber = async (
	ingredientIds: string[]
): Promise<TGetNumber> => {
	return fetch(`${BURGER_API_URL}/orders`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
			authorization: localStorage.getItem('accessToken') || '',
		},
		body: JSON.stringify({ ingredients: ingredientIds }),
	}).then(getResponse<TGetNumber>);
};
