import React, { useMemo } from 'react';
import styles from './card-order.module.scss';
import { IngredientsOrder } from '../ingredients-order/ingredients-order';
import {
	CurrencyIcon,
	FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppSelector } from '../../services/store';
import { Link, useLocation, useMatch } from 'react-router-dom';

type TCardOrder = {
	number: number;
	name: string;
	status: string;
	date: string;
	ingredients: string[];
};

export const CardOrder = ({
	number,
	name,
	status,
	date,
	ingredients,
}: TCardOrder): React.JSX.Element => {
	const location = useLocation();
	const dataIngredients = useAppSelector(
		(state) => state.ingredients.ingredients
	);
	const feed = useMatch('/feed');
	const feedProfile = useMatch('/profile/orders');

	const orderDetailes = useMemo<{ images: string[]; price: number[] }>(() => {
		const order: { images: string[]; price: number[] } = {
			images: [],
			price: [],
		};
		ingredients.forEach((ingredient) => {
			dataIngredients.forEach((dataIngredient) => {
				if (dataIngredient._id === ingredient) {
					order.images.push(dataIngredient.image_mobile);
					order.price.push(dataIngredient.price);
				}
			});
		});
		return order;
	}, [ingredients, dataIngredients]);

	const total = useMemo<number>(() => {
		return orderDetailes.price.reduce((sum, item) => {
			return sum + item;
		}, 0);
	}, [orderDetailes]);
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

	const url = feed ? `/feed/${number}` : `/profile/orders/${number}`;
	return (
		<Link
			key={number}
			to={url}
			state={{ background: location }}
			discover='none'
			className={styles.link}>
			<div
				className={`${styles.container} mt-6 pl-6 pr-6`}
				style={{ width: feed ? 536 : 844 }}>
				<div className={`${styles.header} mt-6`}>
					<p className={'text text_type_digits-default'}>#{number}</p>
					<FormattedDate
						date={new Date(date)}
						className='text text_type_main-default text_color_inactive'
					/>
				</div>
				<p className={'text text_type_main-medium mt-6'}>{name}</p>
				<p
					className={'text text_type_main-default mt-2'}
					style={{ color: colorStatus }}>
					{feedProfile ? statusRussian : ''}
				</p>
				<div className={`${styles.detailes} mt-6 mb-6`}>
					<IngredientsOrder images={orderDetailes.images} />
					<div className={styles.cost}>
						<p className={'text text_type_main-medium'}>{total ? total : 0}</p>
						<CurrencyIcon type='primary' />
					</div>
				</div>
			</div>
		</Link>
	);
};
