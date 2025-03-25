import sReset from './forgot-password.module.scss';
import { useRef } from 'react';
import { Link, Navigate } from 'react-router-dom';
import {
	Input,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { resetPassword } from '../utils/auth-api';

export const ResetPassword = () => {
	const passwordRef = useRef('');
	const tokenRef = useRef('');
	const redirect = localStorage.getItem('getResetPassword');

	if (!redirect) {
		return <Navigate to='/forgot-password' />;
	}

	const handleReset = async (e) => {
		e.preventDefault();
		const password = passwordRef.current.value;
		const token = tokenRef.current.value;
		if (!password) {
			passwordRef.current.focus();
		} else if (!token) {
			tokenRef.current.focus();
		} else {
			await resetPassword({
				password,
				token,
			});
		}
	};
	return (
		<div className={sReset.container}>
			<p className='text text_type_main-medium mb-6'>Востановление пароля</p>
			<Input
				ref={passwordRef}
				type={'password'}
				placeholder={'Введите новый пароль'}
				icon={'ShowIcon'}
				size={'default'}
				extraClass='ml-1 mb-6'
			/>
			<Input
				ref={tokenRef}
				type={'text'}
				placeholder={'Введите код из письма'}
				size={'default'}
				extraClass='ml-1 mb-6'
			/>
			<Button
				htmlType='submit'
				type='primary'
				size='medium'
				extraClass='ml-2 mb-20'
				onClick={handleReset}>
				Сохранить
			</Button>
			<p className='text text_type_main-small text_color_inactive mb-4'>
				Вспомнили пароль? <Link>Войти</Link>
			</p>
		</div>
	);
};
