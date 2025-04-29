import { useState } from 'react';
import sIngredients from './burger-ingredients.module.scss';
import { IngredientCard } from '../ingredient-card/ingredient-card';
import { Tabs } from '../tabs/tabs';
import { Section } from '../tabs/section';
import { getAllIngredients } from '../../services/ingredients/reducer';
import { TCallbackWithIngredient } from '@utils/types';
import { useAppSelector } from '../../services/store';

export type TBurgerIngredientsProps = {
	getProduct: TCallbackWithIngredient;
};
export type TStateTabs = 'булки' | 'соусы' | 'начинки';

const BurgerIngredients = ({
	getProduct,
}: TBurgerIngredientsProps): React.JSX.Element => {
	const data = useAppSelector(getAllIngredients);
	const bunFilter = data.filter((item) => item.type === 'bun');
	const sauceFilter = data.filter((item) => item.type === 'sauce');
	const mainFilter = data.filter((item) => item.type === 'main');

	const [activeTab, setActiveTab] = useState<TStateTabs>('булки');

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
					<IngredientCard data={bunFilter} getProduct={getProduct} />
				</Section>

				<Section
					id='соусы'
					classname={sIngredients.cards}
					onVisibilityChange={setActiveTab}
					label='Соусы'>
					<IngredientCard data={sauceFilter} getProduct={getProduct} />
				</Section>

				<Section
					id='начинки'
					classname={sIngredients.cards}
					label='Начинки'
					onVisibilityChange={setActiveTab}>
					<IngredientCard data={mainFilter} getProduct={getProduct} />
				</Section>
			</div>
		</section>
	);
};

export default BurgerIngredients;
