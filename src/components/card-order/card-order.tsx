import React from 'react';
import styles from './card-order.module.scss';

export const CardOrder = (): React.JSX.Element => {
	return (
		<div className={styles.container}>
			<div className={`${styles.header} mt-6 ml-6 mr-6`}>
				<p className={'text text_type_digits-default'}>#012345</p>
				<p className={styles.date}>16.04.2021</p>
			</div>
			<p className={'text text_type_main-default mt-6 ml-6 mr-6'}>
				Death Star Starship Main бургер
			</p>
			<div className={`${styles.detailes} mt-6 ml-6 mr-6`}></div>
		</div>
	);
};
