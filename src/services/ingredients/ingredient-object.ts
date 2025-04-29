import { TDataIngredient, TIngredientsDetailes } from '@utils/types';

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

export const groupIngredients = (
	ingredientIds: string[],
	allIngredients: TDataIngredient[]
) => {
	const groupedIngredients: Record<string, TIngredientsDetailes> = {};

	ingredientIds.forEach((id) => {
		const ingredient = allIngredients.find((item) => item._id === id);
		if (ingredient) {
			if (groupedIngredients[id]) {
				groupedIngredients[id].count += 1;
			} else {
				groupedIngredients[id] = {
					name: ingredient.name,
					price: ingredient.price,
					image: ingredient.image_mobile,
					count: 1,
				};
			}
		}
	});
	return Object.values(groupedIngredients);
};
