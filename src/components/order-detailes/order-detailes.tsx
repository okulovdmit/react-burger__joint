import sOrder from './order-detailes.module.scss';
import {
	CloseIcon,
	CheckMarkIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Preloader } from '../preloader/preloader';
import React, { useState, useEffect } from 'react';
import {
	getOrderLoading,
	getOrderNumber,
	getOrderError,
	clearError,
} from '../../services/ingredients/reducer';
import { Notification } from '../notification/notification';
import { useAppDispatch, useAppSelector } from '../../services/store';

type TOrderDetailesProp = {
	toggle: () => void;
};

export default function OrderDetailes({
	toggle,
}: TOrderDetailesProp): React.JSX.Element {
	const dispatch = useAppDispatch();
	const isLoading = useAppSelector(getOrderLoading);
	const error = useAppSelector(getOrderError);
	const number = useAppSelector(getOrderNumber);

	const [isError, setIsError] = useState<boolean>(false);

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
					<p className={'text text_type_main-medium mt-15'}>
						Получаем данные о вашем заказе
					</p>
				</>
			) : isError ? (
				<Notification
					type='error'
					text={textError}
					onClick={handleCloseError}
					buttonText='Назад'
				/>
			) : (
				<>
					<CloseIcon type='primary' className={sOrder.close} onClick={toggle} />
					<p className={'text text_type_digits-large'}>{number}</p>
					<p className={'text text_type_main-medium mt-8'}>
						идентификатор заказа
					</p>
					<CheckMarkIcon className={sOrder.done} type='success' />
					<p className={'text text_type_main-default mt-15'}>
						Ваш заказ начали готовить
					</p>
					<p className={'text text_type_main-default text_color_inactive mt-2'}>
						Дождитесь готовности на орбитальной станции
					</p>
				</>
			)}
		</div>
	);
}
