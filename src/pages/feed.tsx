import React from 'react';
import styles from './feed.module.scss';
import { CardOrder } from '../components/card-order/card-order';
import { Statistic } from '../components/statistic/statistic';

export const Feed = (): React.JSX.Element => {
	const cards: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
	return (
		<section className={`${styles.container} mt-10`}>
			<div className={styles.feed}>
				<h1 className={'text text_type_main-large'}>Лента заказов</h1>
				{cards.map((item) => (
					<CardOrder key={item} number={item} />
				))}
			</div>
			<Statistic />
		</section>
	);
};
