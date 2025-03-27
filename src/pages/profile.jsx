import sProfile from './profile.module.scss';
import { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useKey } from '../hooks/use-key';

import {
	Input,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Preloader } from '../component/preloader/preloader';
import { LogoutButton } from '../component/logout-button/logout-button';
import {
	getUser,
	getUserLoading,
	getError,
	clearError,
} from '../services/auth/reducer';
import { updateData } from '../services/auth/action';
import Modal from '../component/modal/modal';
import { Notification } from '../component/notification/notification';

export const Profile = () => {
	const dispatch = useDispatch();
	const user = useSelector(getUser);
	const isLoading = useSelector(getUserLoading);
	const error = useSelector(getError);

	const [name, setName] = useState(user.name);
	const [email, setEmail] = useState(user.email);
	const [isError, setIsError] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);
	const [isChanged, setIsChanged] = useState(false);

	const nameRef = useRef('');
	const emailRef = useRef('');

	const text = 'Данные успешно обновлены!';
	const textError =
		'Ошибка обновления данных! Попробуйте обновить страницу или проверьте введенные данные';

	useEffect(() => {
		if (error) {
			setIsError(true);
		}
	}, [error]);

	const handleSave = () => {
		if (!name) {
			nameRef.current.focus();
		} else if (!email) {
			emailRef.current.focus();
		} else {
			dispatch(updateData({ name, email }))
				.then(() => setIsSuccess(true))
				.finally(() => setIsChanged(false));
		}
	};

	useKey('Enter', handleSave);

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

	const handleCloseError = () => {
		setIsError(false);
	};

	const handleCloseSuccess = () => {
		setIsSuccess(false);
		dispatch(clearError());
	};

	return (
		<div className={sProfile.container}>
			{isLoading ? (
				<Preloader />
			) : (
				<>
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
							readOnly={true}
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
				</>
			)}
			{isSuccess && (
				<Modal toggle={handleCloseSuccess}>
					<Notification
						type='done'
						text={text}
						to='/profile'
						onClick={handleCloseSuccess}
						buttonText='Назад'
					/>
				</Modal>
			)}
			{isError && (
				<Modal toggle={handleCloseError}>
					<Notification
						type='error'
						text={textError}
						onClick={handleCloseError}
						buttonText='Назад'
					/>
				</Modal>
			)}
		</div>
	);
};
