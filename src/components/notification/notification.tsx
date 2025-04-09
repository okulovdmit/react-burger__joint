import sNotification from './notification.module.scss';
import {
	CheckMarkIcon,
	CloseIcon,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate } from 'react-router-dom';
import React from 'react';

type TNotificationProps = {
	type: 'done' | 'success' | 'error';
	text: string;
	to?: string;
	onClick?: () => void;
	buttonText: string;
};
export const Notification = ({
	type,
	text,
	to,
	onClick,
	buttonText,
}: TNotificationProps): React.JSX.Element => {
	const navigate = useNavigate();

	const handle = () => {
		if (to) navigate(to);
	};
	return (
		<div className={sNotification.container}>
			<CloseIcon
				type='primary'
				onClick={onClick}
				className={sNotification.close}
			/>

			{type === 'done' || type === 'success' ? (
				<CheckMarkIcon type='success' className={sNotification.icon} />
			) : (
				<CloseIcon type='error' className={sNotification.icon} />
			)}

			<p className={`${sNotification.text} text text_type_main-medium mt-10`}>
				{text}
			</p>
			<Button
				htmlType='button'
				type='primary'
				size='medium'
				extraClass='mt-20'
				onClick={type === 'success' ? handle : onClick}>
				{buttonText}
			</Button>
		</div>
	);
};
