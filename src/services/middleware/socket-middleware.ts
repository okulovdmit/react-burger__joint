import {
	ActionCreatorWithoutPayload,
	ActionCreatorWithPayload,
	Middleware,
} from '@reduxjs/toolkit';
import { RootState } from '@services/store';
import { refreshToken } from '@utils/auth-api';

export type WsActions<R, S> = {
	connect: ActionCreatorWithPayload<string>;
	disconnect: ActionCreatorWithoutPayload;
	onConnecting?: ActionCreatorWithoutPayload;
	onOpen?: ActionCreatorWithoutPayload;
	onClose?: ActionCreatorWithoutPayload;
	onError: ActionCreatorWithPayload<string>;
	onMessage: ActionCreatorWithPayload<R>;
	onSendMessage?: ActionCreatorWithPayload<S>;
};

export const RECONNECT_PERIOD = 3000;

export const socketMiddleware = <R, S>(
	wsActions: WsActions<R, S>,
	withTokenRefresh = false
): Middleware<Record<string, never>, RootState> => {
	return (store) => {
		let socket: WebSocket | null = null;
		const {
			connect,
			disconnect,
			onConnecting,
			onOpen,
			onClose,
			onError,
			onMessage,
			onSendMessage,
		} = wsActions;
		let isConnected = false;
		let url = '';
		let reconnectTimer = 0;
		const { dispatch } = store;
		return (next) => (action) => {
			if (connect.match(action)) {
				url = action.payload;
				socket = new WebSocket(url);
				isConnected = true;
				onConnecting && dispatch(onConnecting());

				socket.onopen = () => {
					isConnected = true;
					onOpen && dispatch(onOpen());
				};
				socket.onerror = () => {
					dispatch(onError('Ошибка соединения'));
					if (isConnected) {
						reconnectTimer = window.setTimeout(() => {
							dispatch(connect(url));
						}, RECONNECT_PERIOD);
					}
				};

				socket.onclose = () => {
					onClose && dispatch(onClose());

					if (isConnected) {
						reconnectTimer = window.setTimeout(() => {
							dispatch(connect(url));
						}, RECONNECT_PERIOD);
					}
				};
				socket.onmessage = (event) => {
					const { data } = event;

					try {
						const parsedData = JSON.parse(data);
						if (
							withTokenRefresh &&
							parsedData.message === 'Invalid or missing token'
						) {
							refreshToken()
								.then((refreshData) => {
									const wssUrl = new URL(url);
									wssUrl.searchParams.set(
										'token',
										//@ts-expect-error 'do it later'
										refreshData.accessToken.replace('Bearer ', '')
									);
									dispatch(connect(wssUrl.toString()));
								})
								.catch((error) => {
									dispatch(onError((error as Error).message));
								});
							dispatch(disconnect());
							return;
						}
						dispatch(onMessage(parsedData));
					} catch (e) {
						dispatch(onError(`Ошибка: ${e}`));
					}
				};
				return;
			}

			if (socket && onSendMessage?.match(action)) {
				try {
					const data = JSON.stringify(action.payload);
					socket.send(data);
				} catch (e) {
					dispatch(onError(`Ошибка отправки данных: ${e}`));
				}
				return;
			}

			if (socket && disconnect.match(action)) {
				clearTimeout(reconnectTimer);
				isConnected = false;
				reconnectTimer = 0;
				socket.close();
				socket = null;

				return;
			}
			next(action);
		};
	};
};
