import { loadIngredients } from './action.js';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	ingredients: [],
	loading: false,
	error: null,
	selectedIngredients: [],
	selectedBun: null,
	ingredientCounts: {},
};

export const ingredientsSlice = createSlice({
	name: 'ingredients',
	initialState,
	reducers: {
		addIngredient: (state, action) => {
			const ingredient = action.payload;
			state.selectedIngredients.push(action.payload);
			if (state.ingredientCounts[ingredient._id]) {
				state.ingredientCounts[ingredient._id]++;
			} else {
				state.ingredientCounts[ingredient._id] = 1;
			}
		},
		addBun: (state, action) => {
			const bun = action.payload;
			if (state.selectedBun) {
				const oldBunId = state.selectedBun._id;
				if (state.ingredientCounts[oldBunId]) {
					delete state.ingredientCounts[oldBunId];
				}
			}
			state.selectedBun = bun;
			state.ingredientCounts[bun._id] = 2;
		},
		deleteIngredient: (state, action) => {
			const ingredientId = action.payload;
			state.selectedIngredients = state.selectedIngredients.filter(
				(ingredient) => ingredient._id !== action.payload
			);
			if (state.ingredientCounts[ingredientId]) {
				delete state.ingredientCounts[ingredientId];
			}
		},
	},
	selectors: {
		getAllIngredients: (state) => state.ingredients,
		getIngredientsLoading: (state) => state.loading,
		getIngredientsError: (state) => state.error,
		getSelectedIngredients: (state) => state.selectedIngredients,
		getSelectedBun: (state) => state.selectedBun,
		getIngredientCounts: (state) => state.ingredientCounts,
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
	getIngredientCounts,
} = ingredientsSlice.selectors;
