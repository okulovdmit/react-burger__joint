import React, { useEffect } from 'react';
import styles from './feed.module.scss';
import { CardOrder } from '../components/card-order/card-order';
import { Statistic } from '../components/statistic/statistic';
import { useAppDispatch, useAppSelector } from '../services/store';
import { connect } from '../services/feed/actions';
import { WS_ORDERS_URL } from '../utils/constants';
import { getOrders } from '../services/feed/reducer';
import { Preloader } from '../components/preloader/preloader';

export const Feed = (): React.JSX.Element => {
	const dispatch = useAppDispatch();
	const orders = useAppSelector(getOrders);
	useEffect(() => {
		dispatch(connect(WS_ORDERS_URL));
	}, [dispatch]);

	if (orders.length === 0) {
		return (
			<div className={styles.load}>
				<Preloader />
			</div>
		);
	}

	return (
		<section className={`${styles.container} mt-10`}>
			<div className={styles.feed}>
				<h1 className={'text text_type_main-large'}>Лента заказов</h1>
				{orders
					.slice()
					.reverse()
					.map((item) => (
						<CardOrder
							key={item._id}
							ingredients={item.ingredients}
							number={item.number}
							name={item.name}
							status={item.status}
							date={item.updatedAt}
						/>
					))}
			</div>
			<Statistic orders={orders} />
		</section>
	);
};
