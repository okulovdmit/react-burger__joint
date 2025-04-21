import React, { useMemo } from 'react';
import styles from './order-info.module.scss';
import {
	CurrencyIcon,
	FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppSelector } from '../../services/store';
import { useParams } from 'react-router-dom';
import { getOrders } from '../../services/feed/reducer';
import { getIngredientsById } from '../../services/ingredients/reducer';
import { getIngredientsDataById } from '../../services/ingredients/ingredient-object';

export const OrderInfo = (): React.JSX.Element => {
	const { number } = useParams();
	const dataIngredients = useAppSelector(getIngredientsById);
	const orders = useAppSelector(getOrders);
	const order = orders.find((order) => order.number.toString() === number);

	const ingredientsDetails = useMemo<
		{ name: string; price: string; image: string }[]
	>((): { name: string; price: string; image: string }[] => {
		if (!order) return [];
		const data = getIngredientsDataById(dataIngredients, order.ingredients);
		//@ts-expect-error 'later'
		return data;
	}, [dataIngredients, order]);
	console.log(dataIngredients);

	if (!order) return <div>Заказ не найден</div>;
	const { status, name, updatedAt: date } = order;
	return (
		<div className={styles.container}>
			<p className={`${styles.number} text text_type_digits-default mb-10`}>
				{number}
			</p>
			<p className='text text_type_main-medium mb-3'>{name}</p>
			<p className='text text_type_main-default mb-15'>{status}</p>
			<p className='text text_type_main-medium mb-6'>Состав:</p>
			<div className={`${styles.main} mb-10`}>
				{ingredientsDetails.map((item, index) => (
					<>
						<div className={`${styles.detailes} mb-4`}>
							<div className={`${styles.border} mr-4`} key={index}>
								<img className={styles.image} src={item.image} alt={''} />
							</div>
							<p>{item.name}</p>
							<div className={`${styles.cost} ml-4`}>
								<p className={'text text_type_digits-default'}>{item.price}</p>
								<CurrencyIcon type='primary' />
							</div>
						</div>
					</>
				))}
			</div>
			<div className={styles.footer}>
				<FormattedDate
					date={new Date(date)}
					className='text text_type_main-default text_color_inactive'
				/>
				<div className={styles.cost}>
					<p className={'text text_type_digits-default'}>1234</p>
					<CurrencyIcon type='primary' />
				</div>
			</div>
		</div>
	);
};
