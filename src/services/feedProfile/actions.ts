import { createAction } from '@reduxjs/toolkit';
import { TFeedData } from '@utils/types';

export const connectProfile = createAction<
	string,
	'feedProfile/connectProfile'
>('feedProfile/connectProfile');
export const disconnectProfile = createAction('feedProfile/disconnectProfile');

export const onConnectingProfile = createAction(
	'feedProfile/onConnectingProfile'
);
export const onOpenProfile = createAction('feedProfile/onOpenProfile');
export const onCloseProfile = createAction('feedProfile/onCloseProfile');
export const onErrorProfile = createAction<
	string,
	'feedProfile/onErrorProfile'
>('feedProfile/onErrorProfile');
export const onMessageProfile = createAction<
	TFeedData,
	'feedProfile/onMessageProfile'
>('feedProfile/onMessageProfile');

export type FeedProfileActions =
	| ReturnType<typeof connectProfile>
	| ReturnType<typeof disconnectProfile>
	| ReturnType<typeof onConnectingProfile>
	| ReturnType<typeof onOpenProfile>
	| ReturnType<typeof onCloseProfile>
	| ReturnType<typeof onErrorProfile>
	| ReturnType<typeof onMessageProfile>;
