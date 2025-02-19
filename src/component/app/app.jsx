import { useState, useEffect } from 'react';
import s from './app.module.scss';
import { Header } from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

export const App = () => {
	const [state, setState] = useState({
		isLoading: false,
		hasError: false,
		data: [],
	});
	useEffect(() => {
		const fetchData = async () => {
			setState((prevState) => ({
				...prevState,
				isLoading: true,
				hasError: false,
			}));
			try {
				const response = await fetch(
					'https://norma.nomoreparties.space/api/ingredients'
				);
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				const result = await response.json();
				setState((prevState) => ({
					...prevState,
					isLoading: false,
					data: result.data,
				}));
			} catch (error) {
				setState((prevState) => ({
					...prevState,
					hasError: true,
					isLoading: false,
				}));
				console.error('Ошибка загрузки данных:', error);
			}
		};
		fetchData();
	}, []);
	return (
		<div className={s.page}>
			<Header />
			<section className={s.main}>
				<BurgerIngredients ingredients={state.data} />
				<BurgerConstructor ingredients={state.data} />
			</section>
		</div>
	);
};
