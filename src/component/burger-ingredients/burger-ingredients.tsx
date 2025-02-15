import sIngredients from './burger-ingredients.module.scss';
export const BurgerIngredients = () => {
	return (
		<section className={sIngredients.main}>
			<h1 className={'text text_type_main-large mt-10'}>Соберите бургер</h1>
			<div className={`${sIngredients.tab} mt-5`}>
				<button className={`${sIngredients.btn} text text_type_main-default`}>
					Булки
				</button>
				<button className={`${sIngredients.btn} text text_type_main-default`}>
					Булки
				</button>
				<button className={`${sIngredients.btn} text text_type_main-default`}>
					Булки
				</button>
			</div>
		</section>
	);
};
