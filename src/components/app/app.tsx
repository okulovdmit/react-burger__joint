import { useState, useEffect, useCallback } from 'react';
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
	Feed,
} from '../../pages/index';
import { OnlyUnAuth, OnlyAuth } from '../protected-route/protected-route';
import { checkUserAuth } from '../../services/auth/action';
import { TDataIngredient, TCallbackWithIngredient } from '@utils/types';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { OrderInfo } from '../order-info/order-info';
import { ProfileForm } from '../profile-form/ptofile-form';

export const App = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const background = location.state && location.state.background;
	const dispatch = useAppDispatch();
	const data = useAppSelector(getAllIngredients);
	const isLoading = useAppSelector(getIngredientsLoading);
	const isError = useAppSelector(getIngredientsError);

	const [isOpenOrder, setIsOpenOrder] = useState<boolean>(false);
	const [selectedProduct, setSelectedProduct] =
		useState<TDataIngredient | null>(null);

	useEffect(() => {
		dispatch(loadIngredients());
		dispatch(checkUserAuth());
	}, [dispatch]);

	const handleDrop = useCallback<TCallbackWithIngredient>(
		(item) => {
			if (item.type === 'bun') {
				dispatch(addBun(item));
			} else {
				dispatch(addIngredient(item));
			}
		},
		[dispatch]
	);
	const handleDeleteIngredient = useCallback<(key: string, id: string) => void>(
		(key, id) => {
			dispatch(deleteIngredient(key));
			dispatch(deleteCounts(id));
		},
		[dispatch]
	);
	const handleMoveIngredient = useCallback<
		({
			dragIndex,
			hoverIndex,
		}: {
			dragIndex: number;
			hoverIndex: number;
		}) => void
	>(
		({ dragIndex, hoverIndex }) => {
			dispatch(moveIngredient({ dragIndex, hoverIndex }));
		},
		[dispatch]
	);

	const toggle = useCallback(() => {
		navigate(-1);
	}, [navigate]);

	const toggleOrder = useCallback(() => {
		setIsOpenOrder(!isOpenOrder);
	}, [isOpenOrder]);

	const getProduct = useCallback<TCallbackWithIngredient>((product) => {
		setSelectedProduct(product);
	}, []);

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
									getProduct={getProduct}
									toggleOrder={toggleOrder}
									onDropHandler={handleDrop}
									onHandlerDelete={handleDeleteIngredient}
									onMoveIngredient={handleMoveIngredient}
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
					<Route
						path='/register'
						element={<OnlyUnAuth component={<Register />} />}
					/>
					<Route
						path='/forgot-password'
						element={<OnlyUnAuth component={<ForgotPassword />} />}
					/>
					<Route
						path='/reset-password'
						element={<OnlyUnAuth component={<ResetPassword />} />}
					/>
					<Route path='/profile' element={<OnlyAuth component={<Profile />} />}>
						<Route index element={<ProfileForm />} />
						<Route path='orders' element={<NotFound />} />
					</Route>
					<Route path='/*' element={<NotFound />} />
					<Route path='/feed' element={<Feed />} />
					<Route path='/feed/:number' element={<OrderInfo />} />
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
					<Route
						path='/feed/:number'
						element={
							<Modal toggle={toggle}>
								<OrderInfo />
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
