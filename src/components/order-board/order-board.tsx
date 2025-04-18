import React from 'react';
import styles from './order-board.module.scss';

type TOrderBoard = {
	type: 'done' | 'inProgress';
	numbers: number[];
};

export const OrderBoard = ({
	type,
	numbers,
}: TOrderBoard): React.JSX.Element => {
	const title = type === 'done' ? 'Готовы:' : 'В работе:';
	return (
		<div className={styles.container}>
			<h1 className={`${styles.title} text text_type_main-medium mb-6`}>
				{title}
			</h1>
			<div className={styles.number}>
				{numbers.map((item) => (
					<p
						className={'text text_type_digits-default mb-2'}
						key={item}
						style={{ color: type === 'done' ? '#00CCCC' : '#FFF' }}>
						{item}
					</p>
				))}
			</div>
		</div>
	);
};
