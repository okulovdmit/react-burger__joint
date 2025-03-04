import { getIngredients } from '../../utils/ingredients-api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const loadIngredients = createAsyncThunk(
	'ingredients/loadIngredients',
	async () => {
		return getIngredients();
	}
);

export const addIngredient = (ingredient) => ({
	type: 'ingredients/addIngredient',
	payload: ingredient,
});

export const deleteIngredient = (id) => ({
	type: 'ingredients/deleteIngredient',
	payload: id,
});

export const addBun = (bun) => ({
	type: 'ingredients/addBun',
	payload: bun,
});
