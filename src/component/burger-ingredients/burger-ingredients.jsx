import * as PropTypes from 'prop-types';
import sIngredients from './burger-ingredients.module.scss';
import { IngredientCard } from '../ingredient-card/ingredient-card';
import { ingredientPropType } from '../../utils/prop-type';

const BurgerIngredients = ({ ingredients }) => {
	const bunFilter = ingredients.filter((item) => item.type === 'bun');
	const sauceFilter = ingredients.filter((item) => item.type === 'sauce');
	const mainFilter = ingredients.filter((item) => item.type === 'main');
	return (
		<section className={sIngredients.main}>
			<h1 className={'text text_type_main-large mt-10'}>Соберите бургер</h1>
			<div className={`${sIngredients.tab} mt-5`}>
				<button className={`${sIngredients.btn} text text_type_main-default`}>
					Булки
				</button>
				<button className={`${sIngredients.btn} text text_type_main-default`}>
					Соусы
				</button>
				<button className={`${sIngredients.btn} text text_type_main-default`}>
					Начинки
				</button>
			</div>
			<div className={`${sIngredients.ingredients} custom-scroll`}>
				<h2 className={'text text_type_main-medium mt-10'}>Булки</h2>
				<div className={sIngredients.cards}>
					<IngredientCard data={bunFilter} />
				</div>
				<h2 className={'text text_type_main-medium mt-10'}>Соусы</h2>
				<div className={sIngredients.cards}>
					<IngredientCard data={sauceFilter} />
				</div>
				<h2 className={'text text_type_main-medium mt-10'}>Начинки</h2>
				<div className={sIngredients.cards}>
					<IngredientCard data={mainFilter} />
				</div>
			</div>
		</section>
	);
};

BurgerIngredients.propTypes = {
	ingredients: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
};
export default BurgerIngredients;
