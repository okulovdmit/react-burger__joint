import { createSlice } from '@reduxjs/toolkit';
import { TFeedOrder, WebsocketStatus } from '@utils/types';
import { onClose, onConnecting, onError, onMessage, onOpen } from './actions';

export type FeedState = {
	status: WebsocketStatus;
	orders: TFeedOrder[];
	total: number;
	totalToday: number;
	error: string | null;
};

export const initialState: FeedState = {
	status: WebsocketStatus.OFFLINE,
	orders: [],
	total: 0,
	totalToday: 0,
	error: null,
};

export const feedSlice = createSlice({
	name: 'feed',
	initialState,
	reducers: {},
	selectors: {
		getStatus: (state) => state.status,
		getOrders: (state) => state.orders,
		getTotal: (state) => state.total,
		getTotalToday: (state) => state.totalToday,
		getError: (state) => state.error,
	},
	extraReducers: (builder) => {
		builder
			.addCase(onConnecting, (state) => {
				state.status = WebsocketStatus.CONNECTING;
			})
			.addCase(onOpen, (state) => {
				state.status = WebsocketStatus.ONLINE;
			})
			.addCase(onError, (state, action) => {
				state.error = action.payload || null;
			})
			.addCase(onClose, (state) => {
				state.status = WebsocketStatus.OFFLINE;
			})
			.addCase(onMessage, (state, action) => {
				state.orders = action.payload.orders;
				state.total = action.payload.total;
				state.totalToday = action.payload.totalToday;
			});
	},
});

export const { getStatus, getOrders, getTotal, getTotalToday, getError } =
	feedSlice.selectors;
