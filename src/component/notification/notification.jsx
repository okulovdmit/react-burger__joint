import sNotification from './notification.module.scss';
import {
	CheckMarkIcon,
	CloseIcon,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate } from 'react-router-dom';

export const Notification = ({ type, text, to, onClick, buttonText }) => {
	const navigate = useNavigate();

	const handle = () => {
		navigate(to);
	};
	return (
		<div className={sNotification.container}>
			<CloseIcon
				type='primary'
				onClick={onClick}
				className={sNotification.close}
			/>

			{type === 'done' ? (
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
				onClick={type === 'done' ? handle : onClick}>
				{buttonText}
			</Button>
		</div>
	);
};
