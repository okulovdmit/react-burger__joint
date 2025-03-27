import sRegister from './register.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import { useKey } from '../hooks/use-key';
import {
	Input,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { register } from '../services/auth/action';
import { getError, getUserLoading, clearError } from '../services/auth/reducer';
import { Preloader } from '../component/preloader/preloader';
import Modal from '../component/modal/modal';
import { Notification } from '../component/notification/notification';

export const Register = () => {
	const location = useLocation();
	const dispatch = useDispatch();
	const isLoading = useSelector(getUserLoading);
	const error = useSelector(getError);

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [typeInput, setTypeInput] = useState('password');
	const [isDone, setIsDone] = useState(false);
	const [isError, setIsError] = useState(false);

	const textError =
		'Введенные вами данные отсутствуют или неверны. Пожалуйста, проверьте ваши данные и попробуйте еще раз.';

	const text = isDone ? 'Вы успешно зарегистрировались!' : textError;
	const token = localStorage.getItem('accessToken');

	const emailRef = useRef('');
	const passwordRef = useRef('');
	const nameRef = useRef('');

	useEffect(() => {
		if (error) {
			setIsError(true);
			setIsDone(false);
		}
	}, [error]);

	useEffect(() => {
		if (token) {
			setIsDone(true);
			setIsError(false);
		}
	}, [token]);

	const handleSubmit = async () => {
		if (!name) {
			nameRef.current.focus();
		} else if (!email) {
			emailRef.current.focus();
		} else if (!password) {
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
