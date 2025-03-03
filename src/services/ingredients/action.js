import { getIngredients } from '../../utils/ingredients-api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const loadIngredients = createAsyncThunk(
	'ingredients/loadIngredients',
	async () => {
		return getIngredients();
	}
);
