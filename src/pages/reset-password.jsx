import sReset from './forgot-password.module.scss';
import { Link } from 'react-router-dom';
import {
	Input,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
export const ResetPassword = () => {
	return (
		<div className={sReset.container}>
			<p className='text text_type_main-medium mb-6'>Востановление пароля</p>
			<Input
				type={'password'}
				placeholder={'Введите новый пароль'}
				icon={'ShowIcon'}
				size={'default'}
				extraClass='ml-1 mb-6'
			/>
			<Input
				type={'text'}
				placeholder={'Введите код из письма'}
				size={'default'}
				extraClass='ml-1 mb-6'
			/>
			<Button
				htmlType='button'
				type='primary'
				size='medium'
				extraClass='ml-2 mb-20'>
				Сохранить
			</Button>
			<p className='text text_type_main-small text_color_inactive mb-4'>
				Вспомнили пароль? <Link>Войти</Link>
			</p>
		</div>
	);
};
