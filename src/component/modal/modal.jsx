import { createPortal } from 'react-dom';
import { useEffect, useCallback } from 'react';
import sModal from './modal.module.scss';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const rootModal = document.getElementById('root-modal');
export default function Modal({ toggle, children }) {
	const handelKeyDown = useCallback(
		(e) => {
			if (e.key === 'Escape') toggle();
		},
		[toggle]
	);
	useEffect(() => {
		window.addEventListener('keydown', handelKeyDown);

		return () => {
			window.removeEventListener('keydown', handelKeyDown);
		};
	}, [handelKeyDown]);
	return createPortal(
		<ModalOverlay toggle={toggle}>
			<div
				className={sModal.modal}
				onClick={(e) => e.stopPropagation()}
				aria-hidden='true'>
				<header className={`${sModal.header} mt-10 ml-10 mr-10`}>
					<h2 className={'text text_type_main-large'}>Детали заказа</h2>
					<bitton className={sModal.close} onClick={toggle}>
						<CloseIcon type='primary' />
					</bitton>
				</header>
				<main>{children}</main>
			</div>
		</ModalOverlay>,
		rootModal
	);
}
