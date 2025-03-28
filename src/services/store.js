import { ingredientsSlice } from './ingredients/reducer.js';
import { userSlice } from './auth/reducer.js';
import { combineSlices, configureStore as createStore } from '@reduxjs/toolkit';

const rootReducer = combineSlices(ingredientsSlice, userSlice);

export const configureStore = (initialState) => {
	return createStore({
		reducer: rootReducer,
		preloadedState: initialState,
	});
};
