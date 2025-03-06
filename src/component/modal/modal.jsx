import { createPortal } from 'react-dom';
import { useEffect, useCallback } from 'react';
import sModal from './modal.module.scss';
import ModalOverlay from '../modal-overlay/modal-overlay';

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
				{children}
			</div>
		</ModalOverlay>,
		rootModal
	);
}
