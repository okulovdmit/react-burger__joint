import { loadIngredients, getOrder } from './action.js';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { TDataIngredient } from '../../utils/types';

interface IngredientsState {
	ingredients: Array<TDataIngredient>;
	loading: boolean;
	error: string | null;
	selectedIngredients: Array<TDataIngredient>;
	selectedBun: TDataIngredient | null;
	ingredientCounts: { [key: string]: number };
	orderNumber: number | null;
	orderLoading: boolean;
	orderError: string | null;
}

const initialState: IngredientsState = {
	ingredients: [],
	loading: false,
	error: null,
	selectedIngredients: [],
	selectedBun: null,
	ingredientCounts: {},
	orderNumber: null,
	orderLoading: false,
	orderError: null,
};

export const ingredientsSlice = createSlice({
	name: 'ingredients',
	initialState,
	reducers: {
		addIngredient: {
			reducer: (state, action: PayloadAction<TDataIngredient>) => {
				const ingredient = action.payload;
				state.selectedIngredients.push(ingredient);
				if (state.ingredientCounts[ingredient._id]) {
					state.ingredientCounts[ingredient._id]++;
				} else {
					state.ingredientCounts[ingredient._id] = 1;
				}
			},
			prepare: (item: TDataIngredient) => {
				return { payload: { ...item, key: uuidv4() } };
			},
		},
		addBun: {
			reducer: (state, action: PayloadAction<TDataIngredient>) => {
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
			prepare: (item) => {
				return { payload: { ...item, key: uuidv4() } };
			},
		},

		deleteIngredient: (state, action) => {
			state.selectedIngredients = state.selectedIngredients.filter(
				(ingredient) => ingredient.key !== action.payload
			);
		},
		deleteCounts: (state, action) => {
			if (state.ingredientCounts[action.payload] > 1) {
				state.ingredientCounts[action.payload]--;
			} else if (state.ingredientCounts[action.payload] === 1) {
				delete state.ingredientCounts[action.payload];
			}
		},
		moveIngredient: (state, action) => {
			const { dragIndex, hoverIndex } = action.payload;
			const draggedItem = state.selectedIngredients[dragIndex];
			state.selectedIngredients[dragIndex] =
				state.selectedIngredients[hoverIndex];
			state.selectedIngredients[hoverIndex] = draggedItem;
		},
		clearError: (state) => {
			state.orderError = null;
		},
	},
	selectors: {
		getAllIngredients: (state) => state.ingredients,
		getIngredientsLoading: (state) => state.loading,
		getIngredientsError: (state) => state.error,
		getSelectedIngredients: (state) => state.selectedIngredients,
		getSelectedBun: (state) => state.selectedBun,
		getIngredientCounts: (state) => state.ingredientCounts,
		getOrderNumber: (state) => state.orderNumber,
		getOrderLoading: (state) => state.orderLoading,
		getOrderError: (state) => state.orderError,
	},
	extraReducers: (builder) => {
		builder
			.addCase(loadIngredients.pending, (state) => {
				state.loading = true;
			})
			.addCase(loadIngredients.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error?.message || null;
			})
			.addCase(loadIngredients.fulfilled, (state, action) => {
				state.ingredients = action.payload.data;
				state.loading = false;
			})
			.addCase(getOrder.pending, (state) => {
				state.orderLoading = true;
			})
			.addCase(getOrder.fulfilled, (state, action) => {
				state.orderNumber = action.payload.order.number;
				state.orderLoading = false;
			})
			.addCase(getOrder.rejected, (state, action) => {
				state.orderLoading = false;
				state.orderError = action.error?.message || null;
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
	getOrderNumber,
	getOrderLoading,
	getOrderError,
} = ingredientsSlice.selectors;

export const {
	addIngredient,
	addBun,
	deleteIngredient,
	deleteCounts,
	moveIngredient,
	clearError,
} = ingredientsSlice.actions;
