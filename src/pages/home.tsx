import BurgerIngredients, {
	TBurgerIngredientsProps,
} from '../components/burger-ingredients/burger-ingredients';
import BurgerConstructor, {
	TBurgerConstructorProps,
} from '../components/burger-constructor/burger-constructor';
import React from 'react';

type THomeProps = TBurgerConstructorProps & TBurgerIngredientsProps;

export const Home = ({
	getProduct,
	toggleOrder,
	onDropHandler,
	onHandlerDelete,
	onMoveIngredient,
}: THomeProps): React.JSX.Element => {
	return (
		<>
			<BurgerIngredients getProduct={getProduct} />
			<BurgerConstructor
				toggleOrder={toggleOrder}
				onDropHandler={onDropHandler}
				onHandlerDelete={onHandlerDelete}
				onMoveIngredient={onMoveIngredient}
			/>
		</>
	);
};
