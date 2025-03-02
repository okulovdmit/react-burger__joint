import sHeader from './app-header.module.scss';
import {
	Logo,
	BurgerIcon,
	ListIcon,
	ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

export const Header = () => {
	return (
		<header className={`${sHeader.header} mt-10`}>
			<nav className={sHeader.navigation}>
				<button className={`${sHeader.btns}  text_type_main-default`}>
					<BurgerIcon type='primary' />
					<span>Конструктор</span>
				</button>
				<button
					className={`${sHeader.btns}  text_type_main-default text_color_inactive`}>
					<ListIcon type='primary' />
					<span>Лента заказов</span>
				</button>
			</nav>

			<Logo />
			<div className={sHeader.item}>
				<button
					className={`${sHeader.btns} text_type_main-default text_color_inactive`}>
					<ProfileIcon type='primary' />
					<span>Личный кабинет</span>
				</button>
			</div>
		</header>
	);
};
