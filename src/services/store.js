import { ingredientsSlice } from './ingredients/reducer.js';
import { combineSlices, configureStore as createStore } from '@reduxjs/toolkit';

const rootReducer = combineSlices(ingredientsSlice);

export const configureStore = (initialState) => {
	return createStore({
		reducer: rootReducer,
		preloadedState: initialState,
	});
};
