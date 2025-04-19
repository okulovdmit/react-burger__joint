import React from 'react';
import styles from './card-order.module.scss';
import { IngredientsOrder } from '../ingredients-order/ingredients-order';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';

type TCardOrder = {
	number: number;
	name: string;
	date: string;
};

export const CardOrder = ({
	number,
	name,
	date,
}: TCardOrder): React.JSX.Element => {
	return (
		<div className={`${styles.container} mt-6 pl-6 pr-6`}>
			<div className={`${styles.header} mt-6`}>
				<p className={'text text_type_digits-default'}>#{number}</p>
				<FormattedDate date={new Date(date)} />
			</div>
			<p className={'text text_type_main-default mt-6'}>{name}</p>
			<div className={`${styles.detailes} mt-6 mb-6`}>
				<IngredientsOrder />
			</div>
		</div>
	);
};
