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
