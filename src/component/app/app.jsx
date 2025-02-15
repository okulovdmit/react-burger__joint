//import { useState } from 'react';
import s from './app.module.scss';
import { Header } from '../app-header/app-header';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
export const App = () => {
	return (
		<div className={s.page}>
			<Header />
			<section className={s.group}>
				<BurgerIngredients />
				<BurgerConstructor />
			</section>
		</div>
	);
};
