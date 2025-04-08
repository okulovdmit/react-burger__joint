import { TDataIngredient } from '@utils/types';
import { getIngredients, getNumber, TGetNumber } from '@utils/ingredients-api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '@services/store';

type ThunkApiConfig = {
	state: RootState;
	dispatch: AppDispatch;
};

export const loadIngredients = createAsyncThunk<
	{ data: TDataIngredient[] },
	void,
	ThunkApiConfig
>('ingredients/loadIngredients', async () => {
	return getIngredients();
});
export const getOrder = createAsyncThunk<TGetNumber, string[], ThunkApiConfig>(
	'ingredients/getNumber',
	async (id) => {
		return getNumber(id);
	}
);
