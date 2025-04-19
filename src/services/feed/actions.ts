import { createAction } from '@reduxjs/toolkit';
import { TFeedData } from '@utils/types';

export const connect = createAction<string, 'feed/connect'>('feed/connect');
export const disconnect = createAction('feed/disconnect');

export const onConnecting = createAction('feed/onConnecting');
export const onOpen = createAction('feed/onOpen');
export const onClose = createAction('feed/onClose');
export const onError = createAction<string, 'feed/onError'>('feed/onError');
export const onMessage = createAction<TFeedData, 'feed/onMessage'>(
	'feed/onMessage'
);

export type FeedActions =
	| ReturnType<typeof connect>
	| ReturnType<typeof disconnect>
	| ReturnType<typeof onConnecting>
	| ReturnType<typeof onOpen>
	| ReturnType<typeof onClose>
	| ReturnType<typeof onError>
	| ReturnType<typeof onMessage>;
