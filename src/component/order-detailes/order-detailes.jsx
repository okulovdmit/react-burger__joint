import sOrder from './order-detailes.module.scss';
import {
	CloseIcon,
	CheckMarkIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Preloader } from '../preloader/preloader';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
	getOrderLoading,
	getOrderNumber,
	getOrderError,
	clearError,
} from '../../services/ingredients/reducer';
import { Notification } from '../notification/notification';

export default function OrderDetailes({ toggle }) {
	const isLoading = useSelector(getOrderLoading);
	const error = useSelector(getOrderError);
	const number = useSelector(getOrderNumber);

	const [isError, setIsError] = useState(false);

	const textError =
		'Ошибка получения заказа. Попробуйте перезагрузить страницу и повторите попытку';

	useEffect(() => {
		if (error) setIsError(true);
	}, [error]);

	const handleCloseError = () => {
		setIsError(!isError);
		dispatch(clearError());
	};
	return (
		<div className={sOrder.order}>
			{isLoading ? (
				<>
					<Preloader />
					<p className={'text text_type_main-medium mt-30'}>
						Получаем данные о вашем заказе
					</p>
				</>
			) : (
				<>
					<CloseIcon type='primary' className={sOrder.close} onClick={toggle} />
					<p className={'text text_type_digits-large mt-30'}>{number}</p>
					<p className={'text text_type_main-medium mt-8'}>
						идентификатор заказа
					</p>
					<CheckMarkIcon className={sOrder.done} type='success' />
					<p className={'text text_type_main-default mt-15'}>
						Ваш заказ начали готовить
					</p>
					<p
						className={
							'text text_type_main-default text_color_inactive mt-2 mb-15'
						}>
						Дождитесь готовности на орбитальной станции
					</p>
				</>
			)}
			{isError && (
				<Notification
					type='error'
					text={textError}
					onClick={handleCloseError}
					buttonText='Назад'
				/>
			)}
		</div>
	);
}
