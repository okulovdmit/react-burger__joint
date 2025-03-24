import sRegister from './register.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import {
	Input,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { register } from '../services/auth/action';
import { getUserLoading } from '../services/auth/reducer';
import { Preloader } from '../component/preloader/preloader';

export const Register = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const emailRef = useRef('');
	const passwordRef = useRef('');
	const nameRef = useRef('');
	const isLoading = useSelector(getUserLoading);

	const handleSubmit = (e) => {
		e.preventDefault();
		const name = nameRef.current.value;
		const email = emailRef.current.value;
		const password = passwordRef.current.value;
		if (!name) {
			nameRef.current.focus();
		} else if (!email) {
			emailRef.current.focus();
		} else if (!password) {
			passwordRef.current.focus();
		} else {
			try {
				dispatch(register({ email, password, name }));
				isLoading ? <Preloader /> : navigate('/');
			} catch (err) {
				console.log(err);
			}
		}
	};

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
