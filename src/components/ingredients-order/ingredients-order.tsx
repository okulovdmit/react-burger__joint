import React from 'react';
import styles from './ingredients-order.module.scss';
import { dataIngredients } from '@utils/dataIngredients';

export const IngredientsOrder = (): React.JSX.Element => {
	const maxVisibleItems = 6;
	const visibleItems = dataIngredients.slice(0, maxVisibleItems);
	const ingredientsLeft = dataIngredients.length - maxVisibleItems;
	return (
		<div className={styles.container}>
			{visibleItems.map((item, index) => (
				<div
					className={styles.border}
					key={item._id}
					style={{ zIndex: 6 - index }}>
					<img className={styles.image} src={item.image_mobile} alt={''} />
				</div>
			))}
			{ingredientsLeft > 0 && (
				<div className={`${styles.counts} text text_type_digits-default`}>
					+{ingredientsLeft}
				</div>
			)}
		</div>
	);
};
