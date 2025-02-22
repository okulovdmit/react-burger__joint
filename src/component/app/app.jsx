import { useState, useEffect, useCallback } from 'react';
import s from './app.module.scss';
import { Header } from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetailes from '../order-detailes/order-detailes';

const url = 'https://norma.nomoreparties.space/api/ingredients';

export const App = () => {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [hasError, setHasError] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const [isOpenOrder, setIsOpenOrder] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState(null);

	const toggle = useCallback(() => {
		setIsOpen(!isOpen);
	}, [isOpen]);

	const toggleOrder = useCallback(() => {
		setIsOpenOrder(!isOpenOrder);
	}, [isOpenOrder]);

	const getProduct = useCallback(
		(product) => {
			setSelectedProduct(product);
			toggle();
		},
		[toggle]
	);

	const getOrder = useCallback(() => {
		toggleOrder();
	}, [toggleOrder]);

	useEffect(() => {
		const getDataIngredients = async () => {
			setIsLoading(true);
			try {
				const response = await fetch(url);
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
		return <div className='text text_type_main-small'>Немного подождeм</div>;
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
				<BurgerConstructor getOrder={getOrder} ingredients={data} />
			</section>
			{isOpen && (
				<>
					<Modal toggle={toggle}>
						<IngredientDetails product={selectedProduct} />
					</Modal>
				</>
			)}
			{isOpenOrder && <OrderDetailes toggleOrder={toggleOrder} />}
		</div>
	);
};
