import React, { useRef, useState, useEffect } from 'react';
import styles from './profile-form.module.scss';
import {
	Input,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useKey } from '../../hooks/use-key';
import {
	getUser,
	getUserLoading,
	getError,
	clearError,
} from '../../services/auth/reducer';
import { updateData } from '../../services/auth/action';
import { useAppDispatch, useAppSelector } from '../../services/store';
import Modal from '../modal/modal';
import { Notification } from '../notification/notification';
import { Preloader } from '../preloader/preloader';

export const ProfileForm = () => {
	const dispatch = useAppDispatch();
	const user = useAppSelector(getUser);
	const isLoading = useAppSelector(getUserLoading);
	const error = useAppSelector(getError);

	const [name, setName] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [isError, setIsError] = useState<boolean>(false);
	const [isSuccess, setIsSuccess] = useState<boolean>(false);
	const [isChanged, setIsChanged] = useState<boolean>(false);

	const nameRef = useRef<HTMLInputElement>(null);
	const emailRef = useRef<HTMLInputElement>(null);

	const text = 'Данные успешно обновлены!';
	const textError =
		'Ошибка обновления данных! Попробуйте обновить страницу или проверьте введенные данные';

	useEffect(() => {
		if (user) {
			setName(user.name || '');
			setEmail(user.email || '');
		}
	}, [user]);

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
			setName(user.name || '');
			setEmail(user.email || '');
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
		<>
			{isLoading ? (
				<div className={styles.load}>
					<Preloader />
				</div>
			) : (
				<>
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
					{/* @ts-expect-error 'don't need onChange' */}
					<Input
						type={'password'}
						placeholder={'Пароль'}
						value={'123456'}
						readOnly={true}
						icon={'EditIcon'}
						size={'default'}
						extraClass='ml-1 mb-6'
					/>
				</>
			)}
			<div className={styles.btns}>
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
		</>
	);
};
