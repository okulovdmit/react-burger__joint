import sHeader from './app-header.module.scss';
import {
	Logo,
	BurgerIcon,
	ListIcon,
	ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';

export const Header = () => {
	const activeClass = `${sHeader.link}  text_type_main-default`;
	const noneActiveClass = `${sHeader.link}  text_type_main-default text_color_inactive`;
	return (
		<header className={`${sHeader.header} mt-10`}>
			<nav className={sHeader.navigation}>
				<NavLink
					to='/'
					className={({ isActive }) =>
						isActive ? activeClass : noneActiveClass
					}>
					{({ isActive }) => (
						<>
							<BurgerIcon type={isActive ? 'primary' : 'secondary'} />
							<span>Конструктор</span>
						</>
					)}
				</NavLink>
				<NavLink
					to='/order'
					className={({ isActive }) =>
						isActive ? activeClass : noneActiveClass
					}>
					{({ isActive }) => (
						<>
							<ListIcon type={isActive ? 'primary' : 'secondary'} />
							<span>Лента заказов</span>
						</>
					)}
				</NavLink>
			</nav>

			<Logo />
			<div className={sHeader.item}>
				<NavLink
					to='/profile'
					className={({ isActive }) =>
						isActive ? activeClass : noneActiveClass
					}>
					{({ isActive }) => (
						<>
							<ProfileIcon type={isActive ? 'primary' : 'secondary'} />
							<span>Личный кабинет</span>
						</>
					)}
				</NavLink>
			</div>
		</header>
	);
};
