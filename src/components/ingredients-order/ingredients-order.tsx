import styles from './ingredients-order.module.scss';

type TIngredientsOrder = {
	images: string[];
};

export const IngredientsOrder = ({
	images,
}: TIngredientsOrder): React.JSX.Element => {
	const maxVisibleItems = 6;
	const visibleItems = images.slice(0, maxVisibleItems);
	const ingredientsLeft = images.length - maxVisibleItems;
	return (
		<div className={styles.container}>
			{visibleItems.map((item, index) => (
				<div
					className={styles.border}
					key={index}
					style={{ zIndex: 6 - index }}>
					<img className={styles.image} src={item} alt={''} />
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
