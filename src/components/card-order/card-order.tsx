import React from 'react';
import styles from './card-order.module.scss';
import { IngredientsOrder } from '../ingredients-order/ingredients-order';
import { formatDate } from '@vtjhyn/formatdate';

export const CardOrder = ({
	number,
}: {
	number: number;
}): React.JSX.Element => {
	const date = new Date();
	const formattedDate = formatDate(date, 'DD-MM-YYYY HH:mm');
	return (
		<div className={`${styles.container} mt-6 pl-6 pr-6`}>
			<div className={`${styles.header} mt-6`}>
				<p className={'text text_type_digits-default'}>{number}</p>
				<p className={`${styles.date} text text_color_inactive`}>
					{formattedDate}
				</p>
			</div>
			<p className={'text text_type_main-default mt-6'}>
				Death Star Starship Main бургер
			</p>
			<div className={`${styles.detailes} mt-6 mb-6`}>
				<IngredientsOrder />
			</div>
		</div>
	);
};
