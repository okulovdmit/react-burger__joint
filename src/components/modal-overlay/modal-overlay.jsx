import sOverlay from './modal-overlay.module.scss';

export default function ModalOverlay({ children, toggle, onKeyDown }) {
	return (
		<div
			className={sOverlay.overlay}
			onKeyDown={onKeyDown}
			tabIndex={0}
			role='button'
			onClick={toggle}>
			{children}
		</div>
	);
}
