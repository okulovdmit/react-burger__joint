import sCard from './ingredinet-card.module.scss';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';

export const DraggableIngredient = ({ item, getProduct }) => {
	const [{ isDragging }, dragRef] = useDrag({
		type: 'ingredients',
		item: item,
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});
	return (
		<div
			ref={dragRef}
			aria-hidden='true'
			role='button'
			key={item._id}
			className={sCard.card}
			onClick={() => getProduct(item)}
			style={{ opacity: isDragging ? 0.5 : 1 }}>
			<img alt={item.name} src={item.image} />
			<div className={sCard.item}>
				<p className={'text text_type_main-medium'}>{item.price}</p>
				<CurrencyIcon type='primary' />
			</div>
			<div className={sCard.item}>
				<p className={'text text_type_main-default'}>{item.name}</p>
			</div>
		</div>
	);
};
