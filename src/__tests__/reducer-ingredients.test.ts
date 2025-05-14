import { ingredientsSlice, initialState } from '@services/ingredients/reducer';
import { TDataIngredient } from '@utils/types';
import { loadIngredients } from '@services/ingredients/action';

jest.mock('uuid', () => ({
	v4: () => 'mock-uuid',
}));

const testIngredient: TDataIngredient = {
	_id: '60666c42cc7b410027a1a9b1',
	name: 'Краторная булка N-200i',
	type: 'bun',
	proteins: 80,
	fat: 24,
	carbohydrates: 53,
	calories: 420,
	price: 1255,
	image: 'https://code.s3.yandex.net/react/code/bun-02.png',
	image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
	image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
	__v: 0,
};

const testIngredientWithKey = { ...testIngredient, key: 'mock-uuid' };
const testIngredient2: TDataIngredient = {
	_id: '60666c42cc7b410027a1a9b5',
	name: 'Говяжий метеорит (отбивная)',
	type: 'main',
	proteins: 800,
	fat: 800,
	carbohydrates: 300,
	calories: 2674,
	price: 3000,
	image: 'https://code.s3.yandex.net/react/code/meat-04.png',
	image_mobile: 'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
	image_large: 'https://code.s3.yandex.net/react/code/meat-04-large.png',
	__v: 0,
};

describe('reducer-ingredients', () => {
	it('should return the initial state', () => {
		expect(ingredientsSlice.reducer(undefined, { type: '' })).toEqual(
			initialState
		);
	});

	it('should add selectedIngredient and update ingredientCounts', () => {
		const action = ingredientsSlice.actions.addIngredient(testIngredient);
		expect(ingredientsSlice.reducer(initialState, action)).toEqual({
			...initialState,
			selectedIngredients: [testIngredientWithKey],
			ingredientCounts: { [testIngredient._id]: 1 },
		});
	});

	it('should increase the count of selectedIngredient', () => {
		const action = ingredientsSlice.actions.addIngredient(testIngredient);
		const prevState = {
			...initialState,
			selectedIngredients: [testIngredientWithKey],
			ingredientCounts: { [testIngredient._id]: 1 },
		};
		expect(ingredientsSlice.reducer(prevState, action)).toEqual({
			...prevState,
			selectedIngredients: [testIngredientWithKey, testIngredientWithKey],
			ingredientCounts: { [testIngredient._id]: 2 },
		});
	});

	it('should remove selectedIngredient', () => {
		const action = ingredientsSlice.actions.deleteIngredient(
			testIngredientWithKey.key
		);
		const prevState = {
			...initialState,
			selectedIngredients: [testIngredientWithKey],
		};
		expect(ingredientsSlice.reducer(prevState, action)).toEqual({
			...initialState,
		});
	});

	it('should update ingredientCounts', () => {
		const action = ingredientsSlice.actions.deleteCounts(
			testIngredientWithKey._id
		);
		const prevState = {
			...initialState,
			ingredientCounts: { [testIngredient._id]: 1 },
		};
		expect(ingredientsSlice.reducer(prevState, action)).toEqual({
			...initialState,
		});
	});

	it('should sort selectedIngredients', () => {
		const action = ingredientsSlice.actions.moveIngredient({
			dragIndex: 1,
			hoverIndex: 0,
		});
		const prevState = {
			...initialState,
			selectedIngredients: [testIngredient, testIngredientWithKey],
		};
		expect(ingredientsSlice.reducer(prevState, action)).toEqual({
			...initialState,
			selectedIngredients: [testIngredientWithKey, testIngredient],
		});
	});

	it('should load ingredients', () => {
		const data = [testIngredient, testIngredient2];
		expect(
			ingredientsSlice.reducer(initialState, {
				type: loadIngredients.fulfilled.type,
				payload: { data },
			})
		).toEqual({
			...initialState,
			ingredients: data,
			ingredientsById: {
				[testIngredient._id]: testIngredient,
				[testIngredient2._id]: testIngredient2,
			},
		});
	});
});
