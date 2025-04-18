import React from 'react';
import styles from './statistic.module.scss';
import { OrderBoard } from '../order-board/order-board';

export const Statistic = (): React.JSX.Element => {
	const numbers: number[] = [
		12345, 11111, 22222, 33333, 44444, 55555, 66666, 77777, 88888, 99999, 98765,
		12123, 23234, 34345, 45456, 56567, 67678, 78789, 89890, 90901, 10101, 20202,
	];
	return (
		<div className={styles.container}>
			<div className={`${styles.status} mb-15`}>
				<OrderBoard type='done' numbers={numbers} />
				<OrderBoard type='inProgress' numbers={numbers} />
			</div>
			<div className={`${styles.completed} mb-15`}>
				<h2 className={'text text_type_medium'}>Выполнено за все время:</h2>
				<p className={'text text_type_digits-large'}>12345</p>
			</div>
			<div className={styles.completed}>
				<h2 className={'text text_type_medium'}>Выполнено за сегодня:</h2>
				<p className={'text text_type_digits-large'}>12345</p>
			</div>
		</div>
	);
};
