import React from 'react';
import styles from './ingredients-order.module.scss';
import { dataIngredients } from '@utils/dataIngredients';

export const IngredientsOrder = (): React.JSX.Element => {
	return (
		<>
			{dataIngredients.map((item) => (
				<div className={styles.border} key={item._id}>
					<img src={item.image} alt={''} />
				</div>
			))}
		</>
	);
};
