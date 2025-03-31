import { useState } from 'react';
import { useSelector } from 'react-redux';
import * as PropTypes from 'prop-types';
import sIngredients from './burger-ingredients.module.scss';
import { IngredientCard } from '../ingredient-card/ingredient-card';
import { Tabs } from '../tabs/tabs';
import { Section } from '../tabs/section';
import { getAllIngredients } from '../../services/ingredients/reducer';

const BurgerIngredients = ({ toggle, getProduct }) => {
	const data = useSelector(getAllIngredients);
	const bunFilter = data.filter((item) => item.type === 'bun');
	const sauceFilter = data.filter((item) => item.type === 'sauce');
	const mainFilter = data.filter((item) => item.type === 'main');

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
	toggle: PropTypes.func.isRequired,
	getProduct: PropTypes.func.isRequired,
};
export default BurgerIngredients;
