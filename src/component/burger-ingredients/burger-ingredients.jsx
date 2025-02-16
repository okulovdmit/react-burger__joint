import sIngredients from './burger-ingredients.module.scss';
import { IngredientCard } from '../ingredient-card/ingredient-card';
import { ingridientsData } from '@utils/data';

export const BurgerIngredients = () => {
	const bunFilter = ingridientsData.filter((item) => item.type === 'bun');
	const sauceFilter = ingridientsData.filter((item) => item.type === 'sauce');
	const mainFilter = ingridientsData.filter((item) => item.type === 'main');
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
