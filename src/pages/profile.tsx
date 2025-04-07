import sProfile from './profile.module.scss';
import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useKey } from '../hooks/use-key';
import {
	Input,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Preloader } from '../components/preloader/preloader';
import { LogoutButton } from '../components/logout-button/logout-button';
import {
	getUser,
	getUserLoading,
	getError,
	clearError,
} from '../services/auth/reducer';
import { updateData } from '../services/auth/action';
import Modal from '../components/modal/modal';
import { Notification } from '../components/notification/notification';
import { TUserWithoutPassword } from '@utils/types';

export const Profile = (): React.JSX.Element => {
	const dispatch = useDispatch();
	const user = useSelector(getUser);
	const isLoading = useSelector(getUserLoading);
	const error = useSelector(getError);

	const [name, setName] = useState((user as TUserWithoutPassword).name);
	const [email, setEmail] = useState((user as TUserWithoutPassword).email);
	const [isError, setIsError] = useState<boolean>(false);
	const [isSuccess, setIsSuccess] = useState<boolean>(false);
	const [isChanged, setIsChanged] = useState<boolean>(false);

	const nameRef = useRef<HTMLInputElement>(null);
	const emailRef = useRef<HTMLInputElement>(null);

	const text = 'Данные успешно обновлены!';
	const textError =
		'Ошибка обновления данных! Попробуйте обновить страницу или проверьте введенные данные';

	useEffect(() => {
		if (error) {
			setIsError(true);
		}
	}, [error]);

	const handleSave = () => {
		if (!name && nameRef.current) {
			nameRef.current.focus();
		} else if (!email && emailRef.current) {
			emailRef.current.focus();
		} else {
			//@ts-expect-error 'do it later'
			dispatch(updateData({ name, email }))
				.then(() => setIsSuccess(true))
				.finally(() => setIsChanged(false));
		}
	};

	useKey('Enter', handleSave);

	const onIconClick = (ref: React.RefObject<HTMLInputElement>) => {
		if (ref.current) ref.current.focus();
	};

	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value);
		setIsChanged(true);
	};

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
		setIsChanged(true);
	};

	const handleCancel = () => {
		if (user) {
			setName(user.name);
			setEmail(user.email);
			setIsChanged(false);
		}
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
							{/* @ts-expect-error 'need to add 'to' next spint' */}
							<NavLink className={'text text_type_main-medium'}>
								<span className={sProfile.active}>Профиль</span>
							</NavLink>
							{/* @ts-expect-error 'need to add 'to' next spint' */}
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
						{/* @ts-expect-error 'need to add 'onChange' next spint' */}
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
