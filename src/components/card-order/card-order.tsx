import React, { useMemo } from 'react';
import styles from './card-order.module.scss';
import { IngredientsOrder } from '../ingredients-order/ingredients-order';
import {
	CurrencyIcon,
	FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppSelector } from '../../services/store';
import { Link, useLocation } from 'react-router-dom';

type TCardOrder = {
	number: number;
	name: string;
	date: string;
	ingredients: string[];
};

export const CardOrder = ({
	number,
	name,
	date,
	ingredients,
}: TCardOrder): React.JSX.Element => {
	const location = useLocation();
	const dataIngredients = useAppSelector(
		(state) => state.ingredients.ingredients
	);

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
	return (
		<Link
			key={number}
			to={`/feed/${number}`}
			state={{ background: location }}
			discover='none'
			className={styles.link}>
			<div className={`${styles.container} mt-6 pl-6 pr-6`}>
				<div className={`${styles.header} mt-6`}>
					<p className={'text text_type_digits-default'}>#{number}</p>
					<FormattedDate
						date={new Date(date)}
						className='text text_type_main-default text_color_inactive'
					/>
				</div>
				<p className={'text text_type_main-default mt-6'}>{name}</p>
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
