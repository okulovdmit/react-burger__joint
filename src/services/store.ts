import { IngredientsActions, ingredientsSlice } from './ingredients/reducer';
import { UserActions, userSlice } from './auth/reducer';
import { combineSlices, configureStore, ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { feedSlice } from './feed/reducer';
import { socketMiddleware } from './middleware/socket-middleware';
import {
	connect,
	disconnect,
	FeedActions,
	onClose,
	onConnecting,
	onError,
	onMessage,
	onOpen,
} from './feed/actions';
import { TFeedData } from '@utils/types';

const rootReducer = combineSlices(ingredientsSlice, userSlice, feedSlice);

const feedMiddleware = socketMiddleware<TFeedData, unknown>({
	connect,
	disconnect,
	onConnecting,
	onOpen,
	onClose,
	onError,
	onMessage,
});

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware().concat(feedMiddleware);
	},
});
export type AppActions = FeedActions | UserActions | IngredientsActions;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<RootState, unknown, AppActions>;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
