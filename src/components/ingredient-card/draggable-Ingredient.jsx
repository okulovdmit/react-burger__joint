import sCard from './ingredinet-card.module.scss';
import {
	CurrencyIcon,
	Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';
import { useSelector } from 'react-redux';
import { getIngredientCounts } from '../../services/ingredients/reducer';
import { useLocation, Link } from 'react-router-dom';

export const DraggableIngredient = ({ item, getProduct }) => {
	const ingredientCounts = useSelector(getIngredientCounts);
	const location = useLocation();
	const ingredientId = item['_id'];
	const [{ isDragging }, dragRef] = useDrag({
		type: 'ingredients',
		item: item,
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});
	return (
		<Link
			key={ingredientId}
			to={`/ingredients/${ingredientId}`}
			discover='none'
			state={{ background: location }}
			className={sCard.link}>
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
				{ingredientCounts[item._id] > 0 && (
					<Counter
						count={ingredientCounts[item._id]}
						size='default'
						extraClass='m-1'
					/>
				)}
			</div>
		</Link>
	);
};
