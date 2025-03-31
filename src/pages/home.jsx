import BurgerIngredients from '../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../components/burger-constructor/burger-constructor';

export const Home = ({
	toggle,
	getProduct,
	toggleOrder,
	handleDrop,
	handleDeleteIngredient,
	handleMoveIngredient,
}) => {
	return (
		<>
			<BurgerIngredients toggle={toggle} getProduct={getProduct} />
			<BurgerConstructor
				toggleOrder={toggleOrder}
				onDropHandler={handleDrop}
				onHandlerDelete={handleDeleteIngredient}
				onMoveIngredient={handleMoveIngredient}
			/>
		</>
	);
};
