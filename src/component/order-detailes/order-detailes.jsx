import sOrder from './order-detailes.module.scss';
import {
	CloseIcon,
	CheckMarkIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

export default function OrderDetailes({ toggle, number }) {
	return (
		<div className={sOrder.order}>
			<div
				aria-hidden='true'
				role='button'
				className={sOrder.close}
				onClick={toggle}>
				<CloseIcon type='primary' />
			</div>
			<p className={'text text_type_digits-large mt-30'}>{number}</p>
			<p className={'text text_type_main-medium mt-8'}>идентификатор заказа</p>
			<CheckMarkIcon className={sOrder.done} type='primary' />
			<p className={'text text_type_main-default mt-15'}>
				Ваш заказ начали готовить
			</p>
			<p className={'text text_type_main-default text_color_inactive mt-2'}>
				Дождитесь готовности на орбитальной станции
			</p>
		</div>
	);
}
