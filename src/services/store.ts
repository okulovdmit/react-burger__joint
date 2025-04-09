import { ingredientsSlice } from './ingredients/reducer';
import { userSlice } from './auth/reducer';
import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

const rootReducer = combineSlices(ingredientsSlice, userSlice);

export const store = configureStore({
	reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
