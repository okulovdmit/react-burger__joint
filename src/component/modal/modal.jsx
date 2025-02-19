import { createPortal } from 'react-dom';
import sModal from './modal.module.scss';
//import { ingridientsData } from '../../utils/data';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const modalRoot = document.getElementById('react-modals');
export default function Modal(props) {
	return createPortal(
		<div className={sModal.modal}>
			<header className={`${sModal.header} mt-10 ml-10 mr-10`}>
				<h2 className={'text text_type_main-large'}>Детали заказа</h2>
				<CloseIcon type='primary' />
			</header>
			<main>{props.children}</main>
		</div>,
		modalRoot
	);
}
