import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import s from './app.module.scss';
import { Header } from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetailes from '../order-detailes/order-detailes';
import { loadIngredients } from '../../services/ingredients/action';
import {
	getAllIngredients,
	getIngredientsLoading,
	getIngredientsError,
} from '../../services/ingredients/reducer';

export const App = () => {
	const dispatch = useDispatch();
	const data = useSelector(getAllIngredients);
	const isLoading = useSelector(getIngredientsLoading);
	const hasError = useSelector(getIngredientsError);
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
		dispatch(loadIngredients());
	}, [dispatch]);

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
	if (data.length === 0) {
		return <h2>No ingredients</h2>;
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
