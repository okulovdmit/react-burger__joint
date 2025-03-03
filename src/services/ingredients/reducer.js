import { loadIngredients } from './action.js';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	ingredients: [],
	loading: false,
	error: null,
};

export const ingredientsSlice = createSlice({
	name: 'ingredients',
	initialState,
	reducers: {},
	selectors: {
		getAllIngredients: (state) => state.ingredients,
		getIngredientsLoading: (state) => state.loading,
		getIngredientsError: (state) => state.error,
	},
	extraReducers: (builder) => {
		builder
			.addCase(loadIngredients.pending, (state) => {
				state.loading = true;
			})
			.addCase(loadIngredients.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error?.message;
			})
			.addCase(loadIngredients.fulfilled, (state, action) => {
				state.ingredients = action.payload.data;
				state.loading = false;
			});
	},
});

export const { getAllIngredients, getIngredientsLoading, getIngredientsError } =
	ingredientsSlice.selectors;
