import { useState, useEffect } from 'react';
import s from './app.module.scss';
import { Header } from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';

export const App = () => {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [hasError, setHasError] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState(null);

	const toggle = () => {
		setIsOpen(!isOpen);
	};

	const getProduct = (product) => {
		setSelectedProduct(product);
		toggle();
	};

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
				setIsLoading(false);
			} catch (error) {
				setHasError(true);
				setIsLoading(false);
				console.error('Ошибка загрузки данных:', error);
			}
		};
		getDataIngredients();
	}, []);

	if (data.length === 0) {
		return <div className='text text_type_main-small'>Немного подождать</div>;
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
				<BurgerIngredients
					ingredients={data}
					toggle={toggle}
					getProduct={getProduct}
				/>
				<BurgerConstructor ingredients={data} />
			</section>
			{isOpen && (
				<>
					<Modal toggle={toggle}>
						<IngredientDetails product={selectedProduct} />
					</Modal>
				</>
			)}
		</div>
	);
};
