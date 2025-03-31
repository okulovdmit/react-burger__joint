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
			className={`${sIngredients.group} m-4 mr-4 custom-scroll`}
			onClick={(e) => e.stopPropagation()}
			aria-hidden='true'>
			{ingredients.length > 0 ? (
				ingredients.map((item, index) => (
					<RenderIngredient
						key={item.key}
						item={item}
						index={index}
						onHandlerDelete={onHandlerDelete}
						onMoveIngredient={onMoveIngredient}
					/>
				))
			) : (
				<div className={`${sIngredients.text} text text_type_main-medium`}>
					Перетащите сюда ингредиенты
				</div>
			)}
		</div>
	);
};
