import sRegister from './register.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import {
	Input,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { register } from '../services/auth/action';
import { getUser, getUserLoading } from '../services/auth/reducer';

export const Register = () => {
	const dispatch = useDispatch();

	const emailRef = useRef('');
	const passwordRef = useRef('');
	const nameRef = useRef('');
	const user = useSelector(getUser);
	const isLoading = useSelector(getUserLoading);
	console.log('user', user);

	const handleSubmit = (e) => {
		e.preventDefault();
		const name = nameRef.current.value;
		const email = emailRef.current.value;
		const password = passwordRef.current.value;
		if (!name || !email || !password) return;
		dispatch(register({ email, password, name }));
	};

	if (isLoading) return <div>Загрузка...</div>;
	return (
		<div className={sRegister.container}>
			<p className='text text_type_main-medium mb-6'>Регистрация</p>
			<Input
				ref={nameRef}
				type={'text'}
				placeholder={'Имя'}
				size={'default'}
				extraClass='ml-1 mb-6'
			/>
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
				onClick={handleSubmit}>
				Зарегистрироваться
			</Button>
			<p className='text text_type_main-small text_color_inactive mb-4'>
				Уже зарегистрированы? <Link to='/login'>Войти</Link>
			</p>
		</div>
	);
};
