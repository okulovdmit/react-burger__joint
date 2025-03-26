import sForgot from './forgot-password.module.scss';
import { useRef, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	Input,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { forgotPassword } from '../utils/auth-api';
import { Preloader } from '../component/preloader/preloader';
import Modal from '../component/modal/modal';
import { getError, getUserLoading, clearError } from '../services/auth/reducer';
import { Notification } from '../component/notification/notification';

export const ForgotPassword = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const isLoading = useSelector(getUserLoading);
	const error = useSelector(getError);
	const redirect = localStorage.getItem('getResetPassword');

	const [email, setEmail] = useState('');
	const [isError, setIsError] = useState(false);

	const inputRef = useRef('');
	const textError = 'Проверьте корректность введенного E-mail';

	useEffect(() => {
		if (error) {
			setIsError(true);
		}
	}, [error]);

	useEffect(() => {
		if (redirect) {
			navigate('/reset-password');
		}
	}, [redirect, navigate]);

	const handleRecover = async (e) => {
		e.preventDefault();
		if (!email) {
			inputRef.current.focus();
		} else {
			await forgotPassword({ email });
		}
	};

	const closeError = () => {
		setIsError(!isError);
		dispatch(clearError());
	};

	return (
		<div className={sForgot.container}>
			{isLoading ? (
				<Preloader />
			) : (
				<>
					<p className='text text_type_main-medium mb-6'>
						Востановление пароля
					</p>
					<Input
						ref={inputRef}
						type={'email'}
						placeholder={'Укажите e-mail'}
						onChange={(e) => setEmail(e.target.value)}
						value={email}
						size={'default'}
						extraClass='ml-1 mb-6'
					/>
					<Button
						htmlType='submit'
						type='primary'
						size='medium'
						extraClass='ml-2 mb-20'
						onClick={handleRecover}>
						Восстановить
					</Button>
					<p className='text text_type_main-small text_color_inactive mb-4'>
						Вспомнили пароль?{' '}
						<Link to='/login' state={{ from: location }}>
							Войти
						</Link>
					</p>
				</>
			)}

			{isError && (
				<Modal toggle={closeError}>
					<Notification
						type='error'
						text={textError}
						onClick={closeError}
						buttonText='Назад'
					/>
				</Modal>
			)}
		</div>
	);
};
