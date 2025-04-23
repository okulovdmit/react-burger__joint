import { createSlice } from '@reduxjs/toolkit';
import { TFeedOrder, WebsocketStatus } from '@utils/types';
import {
	onCloseProfile,
	onConnectingProfile,
	onErrorProfile,
	onMessageProfile,
	onOpenProfile,
} from './actions';

export type FeedProfileState = {
	status: WebsocketStatus;
	orders: TFeedOrder[];
	error: string | null;
};

export const initialState: FeedProfileState = {
	status: WebsocketStatus.OFFLINE,
	orders: [],
	error: null,
};

export const feedProfileSlice = createSlice({
	name: 'feedProfile',
	initialState,
	reducers: {},
	selectors: {
		getProfileStatus: (state) => state.status,
		getProfileOrders: (state) => state.orders,
		getProfileError: (state) => state.error,
	},
	extraReducers: (builder) => {
		builder
			.addCase(onConnectingProfile, (state) => {
				state.status = WebsocketStatus.CONNECTING;
			})
			.addCase(onOpenProfile, (state) => {
				state.status = WebsocketStatus.ONLINE;
			})
			.addCase(onErrorProfile, (state, action) => {
				state.error = action.payload || null;
			})
			.addCase(onCloseProfile, (state) => {
				state.status = WebsocketStatus.OFFLINE;
			})
			.addCase(onMessageProfile, (state, action) => {
				state.orders = action.payload.orders;
			});
	},
});

export const { getProfileStatus, getProfileOrders, getProfileError } =
	feedProfileSlice.selectors;
