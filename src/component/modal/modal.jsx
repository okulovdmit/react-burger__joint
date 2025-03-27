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
		<ModalOverlay toggle={toggle} onKeyDown={handelKeyDown}>
			<div
				className={sModal.modal}
				onKeyDown={handelKeyDown}
				tabIndex={0}
				role='button'
				onClick={(e) => e.stopPropagation()}>
				{children}
			</div>
		</ModalOverlay>,
		rootModal
	);
}
