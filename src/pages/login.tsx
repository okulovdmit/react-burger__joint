import sLogin from './login.module.scss';
import React, { useRef, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useKey } from '../hooks/use-key';
import {
	Input,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Preloader } from '../components/preloader/preloader';
import { login } from '../services/auth/action';
import { getUserLoading, getError, clearError } from '../services/auth/reducer';
import Modal from '../components/modal/modal';
import { Notification } from '../components/notification/notification';
import { useAppDispatch, useAppSelector } from '../services/store';

const Login = (): React.JSX.Element => {
	const location = useLocation();
	const dispatch = useAppDispatch();

	const error = useAppSelector(getError);
	const isLoading = useAppSelector(getUserLoading);
	const redirectFromResetPassword = localStorage.getItem('getResetPassword');

	const [typeInput, setTypeInput] = useState<'text' | 'password'>('password');
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [isError, setIsError] = useState<boolean>(false);

	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const textError = 'Неверный Email или пароль';

	useEffect(() => {
		if (redirectFromResetPassword) {
			localStorage.removeItem('getResetPassword');
		}
	}, [redirectFromResetPassword]);

	useEffect(() => {
		if (error) {
			setIsError(true);
		}
	}, [error]);

	useEffect(() => {
		if (emailRef.current) emailRef.current.focus();
	}, []);

	const handleLogin = () => {
		if (!email && emailRef.current) {
			emailRef.current.focus();
		} else if (!password && passwordRef.current) {
			passwordRef.current.focus();
		} else {
			dispatch(login({ email, password }));
		}
	};

	useKey('Enter', handleLogin);

	const changeTypeInput = () => {
		typeInput === 'password' ? setTypeInput('text') : setTypeInput('password');
	};

	const closeError = () => {
		setIsError(!isError);
		dispatch(clearError());
	};

	return (
		<div className={sLogin.container}>
			{isLoading ? (
				<Preloader />
			) : (
				<>
					<p className='text text_type_main-medium mb-6'>Вход</p>
					<Input
						ref={emailRef}
						type={'email'}
						placeholder={'E-mail'}
						onChange={(e) => setEmail(e.target.value)}
						value={email}
						size={'default'}
						extraClass='ml-1 mb-6'
					/>
					<Input
						ref={passwordRef}
						type={typeInput}
						placeholder={'Пароль'}
						onChange={(e) => setPassword(e.target.value)}
						value={password}
						icon={'ShowIcon'}
						onIconClick={changeTypeInput}
						size={'default'}
						extraClass='ml-1 mb-6'
					/>
					<Button
						htmlType='submit'
						type='primary'
						size='medium'
						extraClass='ml-2 mb-20'
						onClick={handleLogin}>
						Войти
					</Button>
					<p className='text text_type_main-small text_color_inactive mb-4'>
						Вы - новый пользователь?{' '}
						<Link to='/register' state={{ from: location }}>
							Зарегистрироваться
						</Link>
					</p>
					<p className='text text_type_main-small text_color_inactive mb-4'>
						Забыли пароль?{' '}
						<Link to='/forgot-password' state={{ from: location }}>
							Восстановить пароль
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

export default Login;
