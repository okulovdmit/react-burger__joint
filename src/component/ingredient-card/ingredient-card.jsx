import sCard from './ingredinet-card.module.scss';
import { DraggableIngredient } from './draggable-Ingredient';

export const IngredientCard = ({ data, getProduct }) => {
	return (
		<div className={`${sCard.cards} mt-6`}>
			{data.map((item) => (
				<DraggableIngredient
					key={item._id}
					item={item}
					getProduct={getProduct}
				/>
			))}
		</div>
	);
};
