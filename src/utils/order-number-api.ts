import { BURGER_API_URL, getResponse } from './constants';
import { TFeedOrder } from './types';

type TGetOrderDetailes = {
	success: boolean;
	orders: TFeedOrder[];
};

export const getOrderDetailes = async (
	number: number
): Promise<TGetOrderDetailes> => {
	return fetch(`${BURGER_API_URL}/orders/${number}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
			'Cache-Control': 'no-cache',
		},
	})
		.then(getResponse<TGetOrderDetailes>)
		.then((data) => {
			return data;
		});
};
