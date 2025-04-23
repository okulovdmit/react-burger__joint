import React, { useEffect } from 'react';
import styles from './feed-profile.module.scss';
import { CardOrder } from '../card-order/card-order';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { getProfileOrders } from '../../services/feed-profile/reducer';
import { connectProfile } from '../../services/feed-profile/actions';
import { WS_PROFILE_ORDERS_URL } from '@utils/constants';
import { Preloader } from '../preloader/preloader';

export const FeedProfile = (): React.JSX.Element => {
	const dispatch = useAppDispatch();
	const orders = useAppSelector(getProfileOrders);
	useEffect(() => {
		const accessToken = localStorage
			.getItem('accessToken')
			?.replace('Bearer ', '');
		if (accessToken) {
			const url = `${WS_PROFILE_ORDERS_URL}?token=${accessToken}`;
			dispatch(connectProfile(url));
		}
	}, [dispatch]);

	if (orders.length === 0) {
		return (
			<div className={styles.load}>
				<Preloader />
			</div>
		);
	}
	return (
		<div className={styles.container}>
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
	);
};
