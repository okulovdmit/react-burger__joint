import React, { lazy, Suspense, useState, useEffect, useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import s from './app.module.scss';
import { Header } from '../app-header/app-header';
import Modal from '../modal/modal';
import { Preloader } from '../preloader/preloader';
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
import { OnlyUnAuth, OnlyAuth } from '../protected-route/protected-route';
import { checkUserAuth } from '../../services/auth/action';
import { TDataIngredient, TCallbackWithIngredient } from '@utils/types';
import { useAppDispatch, useAppSelector } from '../../services/store';

const Home = lazy(() => import('../../pages/home'));
const Login = lazy(() => import('../../pages/login'));
const Register = lazy(() => import('../../pages/register'));
const ForgotPassword = lazy(() => import('../../pages/forgot-password'));
const ResetPassword = lazy(() => import('../../pages/reset-password'));
const Profile = lazy(() => import('../../pages/profile'));
const NotFound = lazy(() => import('../../pages/not-found'));
const Feed = lazy(() => import('../../pages/feed'));
const IngredientDetails = lazy(
	() => import('../ingredient-details/ingredient-details')
);
const OrderDetails = lazy(() => import('../order-details/order-details'));
const OrderInfo = lazy(() => import('../order-info/order-info'));
const ProfileForm = lazy(() => import('../profile-form/profile-form'));
const FeedProfile = lazy(() => import('../feed-profile/feed-profile'));

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
				<Suspense fallback={<Preloader />}>
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
						<Route
							path='/login'
							element={<OnlyUnAuth component={<Login />} />}
						/>
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
						<Route
							path='/profile'
							element={<OnlyAuth component={<Profile />} />}>
							<Route index element={<ProfileForm />} />
							<Route path='orders' element={<FeedProfile />} />
						</Route>
						<Route
							path='profile/orders/:number'
							element={<OnlyAuth component={<OrderInfo toggle={toggle} />} />}
						/>
						<Route path='/*' element={<NotFound />} />
						<Route path='/feed' element={<Feed />} />
						<Route
							path='/feed/:number'
							element={<OrderInfo toggle={toggle} />}
						/>
					</Routes>
				</Suspense>
			</section>

			{background && (
				<Suspense fallback={<Preloader />}>
					<Routes>
						<Route
							path='/ingredients/:ingredientId'
							element={
								<Modal toggle={toggle}>
									<IngredientDetails
										toggle={toggle}
										product={selectedProduct}
										isPopup={true}
									/>
								</Modal>
							}
						/>
						<Route
							path='/feed/:number'
							element={
								<Modal toggle={toggle}>
									<OrderInfo toggle={toggle} isPopup={true} />
								</Modal>
							}
						/>
						<Route
							path='/profile/orders/:number'
							element={
								<Modal toggle={toggle}>
									<OrderInfo toggle={toggle} isPopup={true} />
								</Modal>
							}
						/>
					</Routes>
				</Suspense>
			)}
			{isOpenOrder && (
				<Suspense fallback={<Preloader />}>
					<Modal toggle={toggleOrder}>
						<OrderDetails toggle={toggleOrder} />
					</Modal>
				</Suspense>
			)}
		</div>
	);
};
