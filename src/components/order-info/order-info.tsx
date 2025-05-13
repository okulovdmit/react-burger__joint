import React, { useEffect, useMemo, useState } from 'react';
import styles from './order-info.module.scss';
import {
	CloseIcon,
	CurrencyIcon,
	FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppSelector } from '../../services/store';
import { useParams } from 'react-router-dom';
import { getOrders } from '../../services/feed/reducer';
import { getAllIngredients } from '../../services/ingredients/reducer';
import { groupIngredients } from '../../services/ingredients/ingredient-object';
import { TFeedOrder, TIngredientsDetailes } from '@utils/types';
import { getOrderDetailes } from '@utils/order-number-api';
import { Preloader } from '../preloader/preloader';
import { getProfileOrders } from '../../services/feed-profile/reducer';

type TOrderInfo = {
	toggle: () => void;
	isPopup?: boolean;
};

const OrderInfo = ({
	toggle,
	isPopup = false,
}: TOrderInfo): React.JSX.Element => {
	const { number } = useParams();
	const dataIngredients = useAppSelector(getAllIngredients);
	const orders = useAppSelector(getOrders);
	const ordersProfile = useAppSelector(getProfileOrders);
	const order = useMemo(() => {
		let order = orders.find((order) => order.number.toString() === number);
		if (order) {
			return order;
		}
		order = ordersProfile.find((order) => order.number.toString() === number);
		if (order) return order;
	}, [orders, ordersProfile, number]);

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [orderApi, setOrderApi] = useState<TFeedOrder[]>([]);

	useEffect(() => {
		if (!order) {
			setIsLoading(true);
			getOrderDetailes(Number(number))
				.then((data) => {
					setOrderApi(data.orders);
				})
				.finally(() => setIsLoading(false));
		}
	}, [order, number]);

	const ingredientsDetails = useMemo<
		TIngredientsDetailes[]
	>((): TIngredientsDetailes[] => {
		const ingredients = order ? order.ingredients : orderApi[0]?.ingredients;
		if (!order && !orderApi.length) return [];

		return groupIngredients(ingredients, dataIngredients);
	}, [dataIngredients, order, orderApi]);

	const totalCost = useMemo<number>(() => {
		return ingredientsDetails.reduce((acc, item) => {
			return (acc += item.price * item.count);
		}, 0);
	}, [ingredientsDetails]);

	if (isLoading) return <Preloader />;
	if (!order && !orderApi.length)
		return <div className='mt-10'>Заказ не найден</div>;

	const orderData = order ?? orderApi[0];
	const { status, name, updatedAt: date } = orderData;
	const statusRussian =
		status === 'done'
			? 'Выполнен'
			: status === 'pending'
			? 'Готовится'
			: status === 'created'
			? 'Создан'
			: 'Отменен';

	const colorStatus =
		statusRussian === 'Выполнен'
			? '#00CCCC'
			: statusRussian === 'Отменен'
			? '#ff0000'
			: '#fff';

	return (
		<div className={styles.container}>
			{isPopup && (
				<CloseIcon type='primary' className={styles.close} onClick={toggle} />
			)}
			<p className={`${styles.number} text text_type_digits-default mb-10`}>
				{number}
			</p>
			<p className='text text_type_main-medium mb-3'>{name}</p>
			<p
				className='text text_type_main-default mb-15'
				style={{ color: colorStatus }}>
				{statusRussian}
			</p>
			<p className='text text_type_main-medium mb-6'>Состав:</p>
			<div className={`${styles.main} mb-10`}>
				{ingredientsDetails.map((item, index) => (
					<div className={`${styles.detailes} mb-4`} key={index}>
						<div className={`${styles.border} mr-4`}>
							<img className={styles.image} src={item.image} alt={''} />
						</div>
						<p>{item.name}</p>
						<div className={`${styles.cost} ml-4`}>
							<p className={'text text_type_digits-default'}>
								{item.count} x {item.price}
							</p>
							<CurrencyIcon type='primary' />
						</div>
					</div>
				))}
			</div>
			<div className={styles.footer}>
				<FormattedDate
					date={new Date(date)}
					className='text text_type_main-default text_color_inactive'
				/>
				<div className={styles.cost}>
					<p className={'text text_type_digits-default'}>{totalCost}</p>
					<CurrencyIcon type='primary' />
				</div>
			</div>
		</div>
	);
};
export default OrderInfo;
