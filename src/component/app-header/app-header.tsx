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
				<button className={`${sHeader.btns} item button_size_small`}>
					<BurgerIcon type='primary' />
					<span>Конструктор</span>
				</button>
				<button className={`${sHeader.btns} item button_size_small`}>
					<ListIcon type='primary' />
					<span>Лента заказов</span>
				</button>
			</nav>

			<Logo className={sHeader.item} />
			<button className={sHeader.btns}>
				<ProfileIcon type='primary' />
				<span>Личный кабинет</span>
			</button>
		</header>
	);
};
