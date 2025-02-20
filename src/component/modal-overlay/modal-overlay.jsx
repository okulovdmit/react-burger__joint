import sOverlay from './modal-overlay.module.scss';

export default function ModalOverlay({ children, toggle }) {
	return (
		<div
			className={sOverlay.overlay}
			aria-hidden='true'
			role='button'
			onClick={toggle}>
			{children}
		</div>
	);
}
