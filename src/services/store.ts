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
import { feedProfileSlice } from './feed-profile/reducer';
import {
	connectProfile,
	disconnectProfile,
	onConnectingProfile,
	onOpenProfile,
	onCloseProfile,
	onErrorProfile,
	onMessageProfile,
	FeedProfileActions,
} from './feed-profile/actions';

const rootReducer = combineSlices(
	ingredientsSlice,
	userSlice,
	feedSlice,
	feedProfileSlice
);

const feedMiddleware = socketMiddleware<TFeedData, unknown>({
	connect,
	disconnect,
	onConnecting,
	onOpen,
	onClose,
	onError,
	onMessage,
});

export const feedProfileMiddleware = socketMiddleware<TFeedData, unknown>(
	{
		connect: connectProfile,
		disconnect: disconnectProfile,
		onConnecting: onConnectingProfile,
		onOpen: onOpenProfile,
		onClose: onCloseProfile,
		onError: onErrorProfile,
		onMessage: onMessageProfile,
	},
	true
);
export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware().concat(feedMiddleware, feedProfileMiddleware);
	},
});

export type AppActions =
	| FeedActions
	| FeedProfileActions
	| UserActions
	| IngredientsActions;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<RootState, unknown, AppActions>;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
