import { getIngredients, getNumber } from '../../utils/ingredients-api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const loadIngredients = createAsyncThunk(
	'ingredients/loadIngredients',
	async () => {
		return getIngredients();
	}
);
export const getOrder = createAsyncThunk(
	'ingredients/getNumber',
	async (id) => {
		return getNumber(id);
	}
);
// export const addIngredient = (ingredient) => ({
// 	type: 'ingredients/addIngredient',
// 	payload: ingredient,
// });

// export const deleteIngredient = (id) => ({
// 	type: 'ingredients/deleteIngredient',
// 	payload: id,
// });

// export const addBun = (bun) => ({
// 	type: 'ingredients/addBun',
// 	payload: bun,
// });

// export const moveIngredient = (dragIndex, hoverIndex) => ({
// 	type: 'ingredients/moveIngredient',
// 	payload: { dragIndex, hoverIndex },
// });
