import {
	ActionCreatorWithoutPayload,
	ActionCreatorWithPayload,
	Middleware,
} from '@reduxjs/toolkit';
import { RootState } from '@services/store';

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
	wsActions: WsActions<R, S>
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
					onOpen && dispatch(onOpen());
				};
				socket.onerror = () => {
					dispatch(onError('Ошибка соединения'));
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
