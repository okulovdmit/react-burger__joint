import sLogin from './login.module.scss';
import { Link } from 'react-router-dom';
import {
	Input,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
export const Login = () => {
	return (
		<div className={sLogin.container}>
			<p className='text text_type_main-medium mb-6'>Вход</p>
			<Input
				type={'email'}
				placeholder={'E-mail'}
				size={'default'}
				extraClass='ml-1 mb-6'
			/>
			<Input
				type={'password'}
				placeholder={'Пароль'}
				icon={'ShowIcon'}
				size={'default'}
				extraClass='ml-1 mb-6'
			/>
			<Button
				htmlType='button'
				type='primary'
				size='medium'
				extraClass='ml-2 mb-20'>
				Войти
			</Button>
			<p className='text text_type_main-small text_color_inactive mb-4'>
				Вы - новый пользователь? <Link>Зарегистрироваться</Link>
			</p>
			<p className='text text_type_main-small text_color_inactive mb-4'>
				Забыли пароль? <Link>Восстановить пароль</Link>
			</p>
		</div>
	);
};
