import sForgot from './forgot-password.module.scss';
import { useRef, useState, useEffect } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { useKey } from '../hooks/use-key';
import {
	Input,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { forgotPassword } from '../utils/auth-api';
import { Preloader } from '../component/preloader/preloader';
import Modal from '../component/modal/modal';
import { Notification } from '../component/notification/notification';

export const ForgotPassword = () => {
	const location = useLocation();

	const redirect = localStorage.getItem('getResetPassword');

	const [email, setEmail] = useState('');
	const [error, setError] = useState('');
	const [isError, setIsError] = useState(false);
	const [isLoading, setIsloading] = useState(false);

	const inputRef = useRef('');
	const textError = error;

	useEffect(() => {
		inputRef.current.focus();
	}, []);

	const handleRecover = async () => {
		if (!email) {
			inputRef.current.focus();
		} else {
			setIsloading(true);
			forgotPassword({ email })
				.catch((err) => {
					setError(err.message);
					setIsError(true);
				})
				.finally(() => {
					setIsloading(false);
				});
		}
	};

	useKey('Enter', handleRecover);

	const closeError = () => {
		setIsError(!isError);
	};

	if (redirect) {
		return <Navigate to='/reset-password' />;
	}
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
