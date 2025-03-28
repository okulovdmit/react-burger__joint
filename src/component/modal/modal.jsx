import { createPortal } from 'react-dom';
import { useKey } from '../../hooks/use-key';
import sModal from './modal.module.scss';
import ModalOverlay from '../modal-overlay/modal-overlay';

const rootModal = document.getElementById('root-modal');
export default function Modal({ toggle, children }) {
	const key = 'Escape';
	const handelKeyDown = useKey(key, toggle);

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
