import sLogin from './login.module.scss';
import { useRef, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	Input,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Preloader } from '../component/preloader/preloader';
import { login } from '../services/auth/action';
import { getError, getUserLoading, clearError } from '../services/auth/reducer';
import Modal from '../component/modal/modal';
import { Notification } from '../component/notification/notification';

export const Login = () => {
	const location = useLocation();
	const dispatch = useDispatch();

	const isLoading = useSelector(getUserLoading);
	const error = useSelector(getError);

	const [typeInput, setTypeInput] = useState('password');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isError, setIsError] = useState(false);

	const emailRef = useRef('');
	const passwordRef = useRef('');
	const textError = 'Неверный Email или пароль';

	useEffect(() => {
		if (error) {
			setIsError(true);
		}
	}, [error]);

	const handleLogin = (e) => {
		e.preventDefault();

		if (!email) {
			emailRef.current.focus();
		} else if (!password) {
			passwordRef.current.focus();
		} else {
			dispatch(login({ email, password }));
		}
	};

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
