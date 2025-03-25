import sForgot from './forgot-password.module.scss';
import { useRef } from 'react';
import { Link, Navigate } from 'react-router-dom';
import {
	Input,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { forgotPassword } from '../utils/auth-api';

export const ForgotPassword = () => {
	const inputRef = useRef('');
	const redirect = localStorage.getItem('getResetPassword');

	const handleRecover = async (e) => {
		e.preventDefault();
		const email = inputRef.current.value;
		if (!email) {
			inputRef.current.focus();
		} else {
			await forgotPassword({ email });
		}
	};
	if (redirect) {
		return <Navigate to='/reset-password' />;
	}
	return (
		<div className={sForgot.container}>
			<p className='text text_type_main-medium mb-6'>Востановление пароля</p>
			<Input
				ref={inputRef}
				type={'email'}
				placeholder={'Укажите e-mail'}
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
				Вспомнили пароль? <Link to='/login'>Войти</Link>
			</p>
		</div>
	);
};
