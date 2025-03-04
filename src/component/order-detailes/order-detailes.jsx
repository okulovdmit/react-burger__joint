import { createPortal } from 'react-dom';
import { useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import sOrder from './order-detailes.module.scss';
import ModalOverlay from '../modal-overlay/modal-overlay';
import {
	CloseIcon,
	CheckMarkIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { getOrderNumber } from '../../services/ingredients/reducer';

const rootModal = document.getElementById('root-modal');

export default function OrderDetailes({ toggleOrder }) {
	const number = useSelector(getOrderNumber);
	const handelKeyDown = useCallback(
		(e) => {
			if (e.key === 'Escape') toggleOrder();
		},
		[toggleOrder]
	);

	useEffect(() => {
		window.addEventListener('keydown', handelKeyDown);

		return () => {
			window.removeEventListener('keydown', handelKeyDown);
		};
	}, [handelKeyDown]);

	return createPortal(
		<ModalOverlay toggle={toggleOrder}>
			<div
				aria-hidden='true'
				className={sOrder.order}
				onClick={(e) => e.stopPropagation()}>
				<div
					role='button'
					aria-hidden='true'
					className={sOrder.close}
					onClick={toggleOrder}>
					<CloseIcon type='primary' />
				</div>
				<p className={'text text_type_digits-large mt-30'}>{number}</p>
				<p className={'text text_type_main-medium mt-8'}>
					идентификатор заказа
				</p>
				<CheckMarkIcon className={sOrder.done} type='primary' />
				<p className={'text text_type_main-default mt-15'}>
					Ваш заказ начали готовить
				</p>
				<p className={'text text_type_main-default text_color_inactive mt-2'}>
					Дождитесь готовности на орбитальной станции
				</p>
			</div>
		</ModalOverlay>,
		rootModal
	);
}
