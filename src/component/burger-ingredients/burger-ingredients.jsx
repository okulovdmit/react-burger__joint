import { useState } from 'react';
import * as PropTypes from 'prop-types';
import sIngredients from './burger-ingredients.module.scss';
import { IngredientCard } from '../ingredient-card/ingredient-card';
import { ingredientPropType } from '../../utils/prop-type';
import { Tabs } from '../tabs/tabs';
import { Section } from '../tabs/section';

const BurgerIngredients = ({ ingredients, toggle, getProduct }) => {
	const bunFilter = ingredients.filter((item) => item.type === 'bun');
	const sauceFilter = ingredients.filter((item) => item.type === 'sauce');
	const mainFilter = ingredients.filter((item) => item.type === 'main');

	const [activeTab, setActiveTab] = useState('булки');

	return (
		<section className={sIngredients.main}>
			<h1 className={'text text_type_main-large mt-10'}>Соберите бургер</h1>
			<Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
			<div className={`${sIngredients.ingredients} custom-scroll`}>
				<Section
					id='булки'
					classname={sIngredients.cards}
					onVisibilityChange={setActiveTab}
					label='Булки'>
					<IngredientCard
						data={bunFilter}
						toggle={toggle}
						getProduct={getProduct}
					/>
				</Section>

				<Section
					id='соусы'
					classname={sIngredients.cards}
					onVisibilityChange={setActiveTab}
					label='Соусы'>
					<IngredientCard
						data={sauceFilter}
						classname={sIngredients.cards}
						toggle={toggle}
						getProduct={getProduct}
					/>
				</Section>

				<Section
					id='начинки'
					classname={sIngredients.cards}
					label='Начинки'
					onVisibilityChange={setActiveTab}>
					<IngredientCard
						data={mainFilter}
						toggle={toggle}
						getProduct={getProduct}
					/>
				</Section>
			</div>
		</section>
	);
};

BurgerIngredients.propTypes = {
	ingredients: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
};
export default BurgerIngredients;
