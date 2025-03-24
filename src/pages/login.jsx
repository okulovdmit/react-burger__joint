import sLogin from './login.module.scss';
import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
	Input,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Preloader } from '../component/preloader/preloader';
import { login } from '../services/auth/action';

export const Login = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const emailRef = useRef('');
	const passwordRef = useRef('');

	const handleLogin = (e) => {
		e.preventDefault();

		const email = emailRef.current.value;
		const password = passwordRef.current.value;

		if (!email) {
			email.current.focus();
		} else if (!password) {
			passwordRef.current.focus();
		} else {
			try {
				dispatch(login({ email, password }));
				isLoading ? <Preloader /> : navigate('/');
			} catch (err) {
				console.log(err);
			}
		}
	};
	return (
		<div className={sLogin.container}>
			<p className='text text_type_main-medium mb-6'>Вход</p>
			<Input
				ref={emailRef}
				type={'email'}
				placeholder={'E-mail'}
				size={'default'}
				extraClass='ml-1 mb-6'
			/>
			<Input
				ref={passwordRef}
				type={'password'}
				placeholder={'Пароль'}
				icon={'ShowIcon'}
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
				Вы - новый пользователь? <Link to='/register'>Зарегистрироваться</Link>
			</p>
			<p className='text text_type_main-small text_color_inactive mb-4'>
				Забыли пароль? <Link to='/forgot-password'>Восстановить пароль</Link>
			</p>
		</div>
	);
};
