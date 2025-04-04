export type TDataIngredient = {
	_id: string;
	name: string;
	type: 'bun' | 'main' | 'sauce';
	proteins: number;
	fat: number;
	carbohydrates: number;
	calories: number;
	price: number;
	image: string;
	image_mobile: string;
	image_large: string;
	__v: number;
	key?: string;
};

export type TCallbackWithIngredient = (item: TDataIngredient) => void;

export type TUser = {
	email: string;
	name: string;
	password: string;
};

export type TUserWithoutPassword = Pick<TUser, 'email' | 'name'>;
