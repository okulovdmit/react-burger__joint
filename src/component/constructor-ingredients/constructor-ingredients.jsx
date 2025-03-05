import sIngredients from './constructor-ingredients.module.scss';
import { useDrop } from 'react-dnd';
import { useSelector } from 'react-redux';
import { getSelectedIngredients } from '../../services/ingredients/reducer';
import { RenderIngredient } from './render-ingredient';

export const ConsctructorIngredients = ({
	onDropHandler,
	onHandlerDelete,
	onMoveIngredient,
}) => {
	const ingredients = useSelector(getSelectedIngredients);
	const [, dropRef] = useDrop({
		accept: 'ingredients',
		drop(item) {
			onDropHandler(item);
		},
	});

	return (
		<div
			ref={dropRef}
			className={`${sIngredients.group} m-4 custom-scroll`}
			onClick={(e) => e.stopPropagation()}
			aria-hidden='true'>
			{ingredients.map((item, index) => (
				<RenderIngredient
					key={index}
					item={item}
					index={index}
					onHandlerDelete={onHandlerDelete}
					onMoveIngredient={onMoveIngredient}
				/>
				// <div key={index} className={sIngredients.item}>
				// 	<DragIcon type='primary' />
				// 	<ConstructorElement
				// 		text={item.name}
				// 		price={item.price}
				// 		thumbnail={item.image}
				// 		handleClose={() => {
				// 			onHandlerDelete(item._id);
				// 		}}
				// 	/>
				// </div>
			))}
		</div>
	);
};
