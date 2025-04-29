import sCard from './ingredinet-card.module.scss';
import { DraggableIngredient } from './draggable-Ingredient';
import { TDataIngredient, TCallbackWithIngredient } from '@utils/types';
import React from 'react';

type TIngredientCardProps = {
	data: Array<TDataIngredient>;
	getProduct: TCallbackWithIngredient;
};

export const IngredientCard = ({
	data,
	getProduct,
}: TIngredientCardProps): React.JSX.Element => {
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
