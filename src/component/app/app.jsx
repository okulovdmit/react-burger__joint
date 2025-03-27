import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import s from './app.module.scss';
import { Header } from '../app-header/app-header';
import Modal from '../modal/modal';
import { Preloader } from '../preloader/preloader';
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
} from '../../services/ingredients/reducer';
import {
	Home,
	Login,
	Register,
	ForgotPassword,
	ResetPassword,
	Profile,
	NotFound,
} from '../../pages/index';
import { OnlyUnAuth, OnlyAuth } from '../protected-route/protected-route';
import { checkUserAuth } from '../../services/auth/action';

export const App = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const background = location.state && location.state.background;
	const dispatch = useDispatch();
	const data = useSelector(getAllIngredients);
	const isLoading = useSelector(getIngredientsLoading);
	const isError = useSelector(getIngredientsError);
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
		// setIsOpen(!isOpen);
		navigate(-1);
	}, [navigate]);

	const toggleOrder = useCallback(() => {
		setIsOpenOrder(!isOpenOrder);
	}, [isOpenOrder]);

	const getProduct = useCallback((product) => {
		setSelectedProduct(product);
		// toggle();
	}, []);

	useEffect(() => {
		dispatch(loadIngredients());
		dispatch(checkUserAuth());
	}, [dispatch]);

	if (isLoading) {
		return (
			<div className={s.load}>
				<Preloader />
			</div>
		);
	}

	if (isError) {
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
		<div className={s.main}>
			<Header />
			<section className={s.home}>
				<Routes location={background || location}>
					<Route
						path='/'
						element={
							<DndProvider backend={HTML5Backend}>
								<Home
									toggle={toggle}
									getProduct={getProduct}
									toggleOrder={toggleOrder}
									handleDrop={handleDrop}
									handleDeleteIngredient={handleDeleteIngredient}
									handleMoveIngredient={handleMoveIngredient}
								/>
							</DndProvider>
						}
					/>
					<Route
						path='/ingredients/:ingredientId'
						element={
							<IngredientDetails toggle={toggle} product={selectedProduct} />
						}
					/>
					<Route path='/login' element={<OnlyUnAuth component={<Login />} />} />
					<Route path='/register' element={<Register />} />
					<Route path='/forgot-password' element={<ForgotPassword />} />
					<Route path='/reset-password' element={<ResetPassword />} />
					<Route
						path='/profile'
						element={<OnlyAuth component={<Profile />} />}
					/>
					<Route path='/*' element={<NotFound />} />
				</Routes>
			</section>

			{background && (
				<Routes>
					<Route
						path='/ingredients/:ingredientId'
						element={
							<Modal toggle={toggle}>
								<IngredientDetails toggle={toggle} product={selectedProduct} />
							</Modal>
						}
					/>
				</Routes>
			)}
			{isOpenOrder && (
				<Modal toggle={toggleOrder}>
					<OrderDetailes toggle={toggleOrder} />
				</Modal>
			)}
		</div>
	);
};
