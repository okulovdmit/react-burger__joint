import { useState, useEffect } from 'react';
import s from './app.module.scss';
import { Header } from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

export const App = () => {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [hasError, setHasError] = useState(false);

	useEffect(() => {
		const getDataIngredients = async () => {
			setIsLoading(true);
			try {
				const response = await fetch(
					'https://norma.nomoreparties.space/api/ingredients'
				);
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				const result = await response.json();
				setData(result.data);
			} catch (error) {
				setHasError(true);
				setIsLoading(false);
				console.error('Ошибка загрузки данных:', error);
			}
		};
		getDataIngredients();
	}, []);

	if (data.length === 0) {
		return <div className='text text_type_main-small'>Загрузка...</div>;
	}
	if (isLoading) {
		return <div className='text text_type_main-small'>Загрузка...</div>;
	}

	if (hasError) {
		return (
			<div className='text text_type_main-small'>
				Произошла ошибка при загрузке данных
			</div>
		);
	}

	return (
		<div className={s.page}>
			<Header />
			<section className={s.main}>
				<BurgerIngredients ingredients={data} />
				<BurgerConstructor ingredients={data} />
			</section>
		</div>
	);
};
