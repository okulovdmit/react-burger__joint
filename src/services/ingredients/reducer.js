import { loadIngredients } from './action.js';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	ingredients: [],
	loading: false,
	error: null,
	selectedIngredients: [],
	selectedBun: null,
};

export const ingredientsSlice = createSlice({
	name: 'ingredients',
	initialState,
	reducers: {
		addIngredient: (state, action) => {
			state.selectedIngredients.push(action.payload);
		},
		addBun: (state, action) => {
			state.selectedBun = action.payload;
		},
		deleteIngredient: (state, action) => {
			state.selectedIngredients = state.selectedIngredients.filter(
				(ingredient) => ingredient._id !== action.payload
			);
		},
	},
	selectors: {
		getAllIngredients: (state) => state.ingredients,
		getIngredientsLoading: (state) => state.loading,
		getIngredientsError: (state) => state.error,
		getSelectedIngredients: (state) => state.selectedIngredients,
		getSelectedBun: (state) => state.selectedBun,
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

export const {
	getAllIngredients,
	getIngredientsLoading,
	getIngredientsError,
	getSelectedIngredients,
	getSelectedBun,
} = ingredientsSlice.selectors;
