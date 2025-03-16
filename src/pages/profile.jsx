import sProfile from './profile.module.scss';
import { NavLink } from 'react-router-dom';
import {
	Input,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
export const Profile = () => {
	return (
		<div className={sProfile.container}>
			<div className={sProfile.navigate}>
				<nav className={`${sProfile.links} mb-20`}>
					<NavLink className={'text text_type_main-medium'}>
						<span className={sProfile.active}>Профиль</span>
					</NavLink>
					<NavLink className={'text text_type_main-medium'}>
						<span className={'text_color_inactive'}>История заказов</span>
					</NavLink>
					<NavLink className={'text text_type_main-medium'}>
						<span className={'text_color_inactive'}>Выход</span>
					</NavLink>
				</nav>
				<p className='text text_type_main-default text_color_inactive'>
					В этом разделе вы можете изменить свои персональные данные
				</p>
			</div>

			<div className={`${sProfile.inputs} ml-15`}>
				<Input
					type={'text'}
					placeholder={'Имя'}
					value={'name'}
					icon={'EditIcon'}
					size={'default'}
					extraClass='ml-1 mb-6'
				/>
				<Input
					type={'email'}
					placeholder={'E-mail'}
					value={'mail'}
					icon={'EditIcon'}
					size={'default'}
					extraClass='ml-1 mb-6'
				/>
				<Input
					type={'password'}
					placeholder={'Пароль'}
					value={'123456'}
					icon={'EditIcon'}
					size={'default'}
					extraClass='ml-1 mb-6'
				/>
				<div className={sProfile.btns}>
					<Button
						htmlType='button'
						type='primary'
						size='medium'
						extraClass='ml-2 mb-20'>
						Отменить
					</Button>
					<Button
						htmlType='button'
						type='primary'
						size='medium'
						extraClass='ml-2 mb-20'>
						Сохранить
					</Button>
				</div>
			</div>
		</div>
	);
};
