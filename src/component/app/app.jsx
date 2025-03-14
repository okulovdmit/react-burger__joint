import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Route, Routes } from 'react-router-dom';
import s from './app.module.scss';
import { Header } from '../app-header/app-header';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetailes from '../order-detailes/order-detailes';
import { loadIngredients } from '../../services/ingredients/action';
import {
	addIngredient,
	addBun,
	deleteIngredient,
	deleteCounts,
	moveIngredient,
	getAllIngredients,
	getIngredientsLoading,
	getIngredientsError,
	getOrderNumber,
} from '../../services/ingredients/reducer';
import { Home } from '../../pages/index';

export const App = () => {
	const dispatch = useDispatch();
	const data = useSelector(getAllIngredients);
	const isLoading = useSelector(getIngredientsLoading);
	const hasError = useSelector(getIngredientsError);
	const number = useSelector(getOrderNumber);
	const [isOpen, setIsOpen] = useState(false);
	const [isOpenOrder, setIsOpenOrder] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState(null);

	const handleDrop = useCallback(
		(item) => {
			if (item.type === 'bun') {
				dispatch(addBun(item));
			} else {
				dispatch(addIngredient(item));
			}
		},
		[dispatch]
	);
	const handleDeleteIngredient = useCallback(
		(key, id) => {
			dispatch(deleteIngredient(key));
			dispatch(deleteCounts(id));
		},
		[dispatch]
	);
	const handleMoveIngredient = useCallback(
		(dragIndex, hoverIndex) => {
			dispatch(moveIngredient(dragIndex, hoverIndex));
		},
		[dispatch]
	);

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
				<DndProvider backend={HTML5Backend}>
					<Routes>
						<Route
							path='/'
							element={
								<Home
									toggle={toggle}
									getProduct={getProduct}
									toggleOrder={toggleOrder}
									handleDrop={handleDrop}
									handleDeleteIngredient={handleDeleteIngredient}
									handleMoveIngredient={handleMoveIngredient}
								/>
							}
						/>
					</Routes>
				</DndProvider>
			</section>

			{isOpen && (
				<>
					<Modal toggle={toggle}>
						<IngredientDetails toggle={toggle} product={selectedProduct} />
					</Modal>
				</>
			)}
			{isOpenOrder && (
				<>
					<Modal toggle={toggleOrder}>
						<OrderDetailes toggle={toggleOrder} number={number} />
					</Modal>
				</>
			)}
		</div>
	);
};
