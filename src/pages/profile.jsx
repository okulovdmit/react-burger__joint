import sProfile from './profile.module.scss';
import { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
	Input,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Preloader } from '../component/preloader/preloader';
import { LogoutButton } from '../component/logout-button/logout-button';
import { getUser, getUserLoading } from '../services/auth/reducer';
import { updateData } from '../services/auth/action';

export const Profile = () => {
	const dispatch = useDispatch();
	const user = useSelector(getUser);
	const isLoading = useSelector(getUserLoading);

	const [name, setName] = useState(user.name);
	const [email, setEmail] = useState(user.email);
	const [isChanged, setIsChanged] = useState(false);

	const nameRef = useRef('');
	const emailRef = useRef('');

	const onIconClick = (ref) => {
		ref.current.focus();
	};

	const handleNameChange = (e) => {
		setName(e.target.value);
		setIsChanged(true);
	};

	const handleEmailChange = (e) => {
		setEmail(e.target.value);
		setIsChanged(true);
	};

	const handleCancel = () => {
		setName(user.name);
		setEmail(user.email);
		setIsChanged(false);
	};

	const handleSave = () => {
		if (!name) {
			nameRef.current.focus();
		} else if (!email) {
			emailRef.current.focus();
		} else {
			try {
				dispatch(updateData({ name, email }));
				isLoading ? <Preloader /> : null;
			} catch (err) {
				console.log(err);
			}
		}
		setIsChanged(false);
	};

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
					<LogoutButton />
				</nav>
				<p className='text text_type_main-default text_color_inactive'>
					В этом разделе вы можете изменить свои персональные данные
				</p>
			</div>

			<div className={`${sProfile.inputs} ml-15`}>
				<Input
					ref={nameRef}
					type={'text'}
					placeholder={'Имя'}
					onChange={handleNameChange}
					value={name}
					icon={'EditIcon'}
					onIconClick={() => onIconClick(nameRef)}
					size={'default'}
					extraClass='ml-1 mb-6'
				/>
				<Input
					ref={emailRef}
					type={'email'}
					placeholder={'E-mail'}
					onChange={handleEmailChange}
					value={email}
					icon={'EditIcon'}
					onIconClick={() => onIconClick(emailRef)}
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
					{isChanged && (
						<>
							<Button
								htmlType='button'
								type='primary'
								size='medium'
								onClick={handleCancel}
								extraClass='ml-2 mb-20'>
								Отменить
							</Button>
							<Button
								htmlType='button'
								type='primary'
								size='medium'
								extraClass='ml-2 mb-20'
								onClick={handleSave}>
								Сохранить
							</Button>
						</>
					)}
				</div>
			</div>
		</div>
	);
};
