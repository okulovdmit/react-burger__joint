import sOverlay from './modal-overlay.module.scss';
import React from 'react';

type TModalOverlayProps = {
	children: React.ReactNode;
	toggle: () => void;
	onKeyDown: React.KeyboardEventHandler<Element>;
};

export default function ModalOverlay({
	children,
	toggle,
	onKeyDown,
}: TModalOverlayProps): React.JSX.Element {
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
