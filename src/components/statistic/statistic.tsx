import React, { useMemo } from 'react';
import styles from './statistic.module.scss';
import { OrderBoard } from '../order-board/order-board';
import { useAppSelector } from '../../services/store';
import { getTotal, getTotalToday } from '../../services/feed/reducer';
import { TFeedOrders } from '../../utils/types';

type TStatistic = {
	orders: TFeedOrders[];
};
export const Statistic = ({ orders }: TStatistic): React.JSX.Element => {
	const total = useAppSelector(getTotal);
	const totalToday = useAppSelector(getTotalToday);
	const ordersNumber = useMemo<{ done: number[]; inProgress: number[] }>(() => {
		const numbers: { done: number[]; inProgress: number[] } = {
			done: [],
			inProgress: [],
		};
		orders.filter((item) => {
			if (item.status === 'done') numbers.done.push(item.number);
			if (item.status !== 'done') numbers.inProgress.push(item.number);
		});
		return numbers;
	}, [orders]);

	return (
		<div className={styles.container}>
			<div className={`${styles.status} mb-15`}>
				<OrderBoard type='done' numbers={ordersNumber.done} />
				<OrderBoard type='inProgress' numbers={ordersNumber.inProgress} />
			</div>
			<div className={`${styles.completed} mb-15`}>
				<h2 className={'text text_type_medium'}>Выполнено за все время:</h2>
				<p className={'text text_type_digits-large'}>{total}</p>
			</div>
			<div className={styles.completed}>
				<h2 className={'text text_type_medium'}>Выполнено за сегодня:</h2>
				<p className={'text text_type_digits-large'}>{totalToday}</p>
			</div>
		</div>
	);
};
