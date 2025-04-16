import sRegister from './register.module.scss';
import { Link, useLocation } from 'react-router-dom';
import React, { useRef, useState, useEffect } from 'react';
import { useKey } from '../hooks/use-key';
import {
	Input,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { register } from '../services/auth/action';
import { getError, getUserLoading, clearError } from '../services/auth/reducer';
import { Preloader } from '../components/preloader/preloader';
import Modal from '../components/modal/modal';
import { Notification } from '../components/notification/notification';
import { useAppDispatch, useAppSelector } from '../services/store';

export const Register = (): React.JSX.Element => {
	const location = useLocation();
	const dispatch = useAppDispatch();
	const isLoading = useAppSelector(getUserLoading);
	const error = useAppSelector(getError);

	const [name, setName] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [typeInput, setTypeInput] = useState<'text' | 'password'>('password');
	const [isDone, setIsDone] = useState<boolean>(false);
	const [isError, setIsError] = useState<boolean>(false);

	const textError =
		'Введенные вами данные отсутствуют или неверны. Пожалуйста, проверьте ваши данные и попробуйте еще раз.';

	const text = isDone ? 'Вы успешно зарегистрировались!' : textError;
	const token = localStorage.getItem('accessToken');

	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const nameRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (error) {
			setIsError(true);
			setIsDone(false);
		}
	}, [error]);

	useEffect(() => {
		if (nameRef.current) nameRef.current.focus();
	}, []);

	useEffect(() => {
		if (token) {
			setIsDone(true);
			setIsError(false);
		}
	}, [token]);

	const handleSubmit = async () => {
		if (!name && nameRef.current) {
			nameRef.current.focus();
		} else if (!email && emailRef.current) {
			emailRef.current.focus();
		} else if (!password && passwordRef.current) {
			passwordRef.current.focus();
		} else {
			setIsError(false);
			setIsDone(false);
			dispatch(register({ email, password, name }));
		}
	};

	useKey('Enter', handleSubmit);

	const changeTypeInput = () => {
		typeInput === 'password' ? setTypeInput('text') : setTypeInput('password');
	};

	const closeRegistration = () => {
		setIsDone(!isDone);
		dispatch(clearError());
	};

	const closeError = () => {
		setIsError(!isError);
		dispatch(clearError());
	};

	return (
		<div className={sRegister.container}>
			{isLoading ? (
				<Preloader />
			) : (
				<>
					<p className='text text_type_main-medium mb-6'>Регистрация</p>
					<Input
						ref={nameRef}
						type={'text'}
						placeholder={'Имя'}
						onChange={(e) => setName(e.target.value)}
						value={name}
						size={'default'}
						extraClass='ml-1 mb-6'
					/>
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
						icon={'ShowIcon'}
						onChange={(e) => setPassword(e.target.value)}
						value={password}
						onIconClick={changeTypeInput}
						size={'default'}
						extraClass='ml-1 mb-6'
					/>
					<Button
						htmlType='submit'
						type='primary'
						size='medium'
						extraClass='ml-2 mb-20'
						onClick={handleSubmit}>
						Зарегистрироваться
					</Button>
					<p className='text text_type_main-small text_color_inactive mb-4'>
						Уже зарегистрированы?{' '}
						<Link to='/login' state={{ from: location }}>
							Войти
						</Link>
					</p>
				</>
			)}

			{isDone && (
				<Modal toggle={closeRegistration}>
					<Notification
						type='success'
						text={text}
						to='/login'
						buttonText='Войти'
					/>
				</Modal>
			)}
			{isError && (
				<Modal toggle={closeError}>
					<Notification
						type='error'
						text={text}
						onClick={closeError}
						buttonText='Назад'
					/>
				</Modal>
			)}
		</div>
	);
};
