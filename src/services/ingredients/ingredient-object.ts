import { TDataIngredient } from '@utils/types';

export const convertArrayToObject = (
	array: TDataIngredient[]
): Record<string, TDataIngredient> => {
	return array.reduce((acc, ingredient) => {
		acc[ingredient._id] = ingredient;
		return acc;
	}, {} as Record<string, TDataIngredient>);
};

export const getIngredientsDataById = (
	ingredientsById: { [key: string]: TDataIngredient },
	ids: string[]
) => {
	return ids.map((id) => {
		const ingredient = ingredientsById[id];
		if (ingredient) {
			return {
				name: ingredient.name,
				price: ingredient.price,
				image: ingredient.image_mobile,
			};
		}
	});
};
