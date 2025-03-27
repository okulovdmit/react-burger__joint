import sReset from './forgot-password.module.scss';
import { useRef, useState } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { useKey } from '../hooks/use-key';
import {
	Input,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { resetPassword } from '../utils/auth-api';
import { Preloader } from '../component/preloader/preloader';
import Modal from '../component/modal/modal';
import { Notification } from '../component/notification/notification';

export const ResetPassword = () => {
	const location = useLocation();

	const redirect = localStorage.getItem('getResetPassword');

	const [typeInput, setTypeInput] = useState('password');
	const [password, setPassword] = useState('');
	const [token, setToken] = useState('');
	const [error, setError] = useState('');
	const [isError, setIsError] = useState(false);
	const [isLoading, setIsloading] = useState(false);
	const [isDone, setIsDone] = useState(false);

	const passwordRef = useRef('');
	const tokenRef = useRef('');

	const textError =
		error === 'Incorrect reset token'
			? 'Неверный код'
			: 'Произошла ошибка. Пожалуйста, проверьте данные и повторите попытку';
	const text = 'Пароль успешно изменен';

	const handleReset = async () => {
		if (!password) {
			passwordRef.current.focus();
		} else if (!token) {
			tokenRef.current.focus();
		} else {
			setIsloading(true);
			resetPassword({
				password,
				token,
			})
				.then(() => {
					setIsDone(true);
				})
				.catch((err) => {
					setError(err.message);
					setIsError(true);
				})
				.finally(() => {
					setIsloading(false);
				});
		}
	};
	useKey('Enter', handleReset);

	if (!redirect) {
		return <Navigate to='/forgot-password' />;
	}

	const closeError = () => {
		setIsError(!isError);
	};

	const close = () => {
		setIsDone(false);
	};

	const changeTypeInput = () => {
		typeInput === 'password' ? setTypeInput('text') : setTypeInput('password');
	};
	return (
		<div className={sReset.container}>
			{isLoading ? (
				<Preloader />
			) : (
				<>
					<p className='text text_type_main-medium mb-6'>
						Востановление пароля
					</p>
					<Input
						ref={passwordRef}
						type={typeInput}
						placeholder={'Введите новый пароль'}
						onChange={(e) => setPassword(e.target.value)}
						value={password}
						icon={'ShowIcon'}
						onIconClick={changeTypeInput}
						size={'default'}
						extraClass='ml-1 mb-6'
					/>
					<Input
						ref={tokenRef}
						type={'text'}
						placeholder={'Введите код из письма'}
						onChange={(e) => setToken(e.target.value)}
						value={token}
						size={'default'}
						extraClass='ml-1 mb-6'
					/>
					<Button
						htmlType='reset'
						type='primary'
						size='medium'
						extraClass='ml-2 mb-20'
						onClick={handleReset}>
						Сохранить
					</Button>
					<p className='text text_type_main-small text_color_inactive mb-4'>
						Вспомнили пароль?{' '}
						<Link to='/login' state={{ from: location }}>
							Войти
						</Link>
					</p>
				</>
			)}

			{isDone && (
				<Modal toggle={close}>
					<Notification
						type='done'
						text={text}
						to='/login'
						onClick={close}
						buttonText='Войти'
					/>
				</Modal>
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
