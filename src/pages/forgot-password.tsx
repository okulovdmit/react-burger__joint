import sForgot from './forgot-password.module.scss';
import React, { useRef, useState, useEffect } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { useKey } from '../hooks/use-key';
import {
	Input,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { forgotPassword } from '../utils/auth-api';
import { Preloader } from '../components/preloader/preloader';
import Modal from '../components/modal/modal';
import { Notification } from '../components/notification/notification';

const ForgotPassword = (): React.JSX.Element => {
	const location = useLocation();

	const redirect = localStorage.getItem('getResetPassword');

	const [email, setEmail] = useState<string>('');
	const [error, setError] = useState<string>('');
	const [isError, setIsError] = useState<boolean>(false);
	const [isLoading, setIsloading] = useState<boolean>(false);

	const inputRef = useRef<HTMLInputElement>(null);
	const textError = error;

	useEffect(() => {
		if (inputRef.current) inputRef.current.focus();
	}, []);

	const handleRecover = async () => {
		if (!email && inputRef.current) {
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
export default ForgotPassword;
