import sProfile from './profile.module.scss';
import React from 'react';
import { NavLink, Outlet, useMatch } from 'react-router-dom';
import { LogoutButton } from '../components/logout-button/logout-button';

export const Profile = (): React.JSX.Element => {
	const profile = useMatch('/profile');
	const feed = useMatch('/profile/orders');
	const activeClass = `${sProfile.active}  text_type_main-medium`;
	const noneActiveClass = 'text_type_main-medium text_color_inactive';

	return (
		<div className={sProfile.container}>
			<div className={sProfile.navigate}>
				<nav className={`${sProfile.links} mb-20`}>
					<NavLink
						to='/profile'
						className={() => (profile ? activeClass : noneActiveClass)}>
						<span>Профиль</span>
					</NavLink>

					<NavLink
						to='/profile/orders'
						className={() => (feed ? activeClass : noneActiveClass)}>
						<span>История заказов</span>
					</NavLink>
					<LogoutButton />
				</nav>
				<p className='text text_type_main-default text_color_inactive'>
					В этом разделе вы можете изменить свои персональные данные
				</p>
			</div>

			<div className={`${sProfile.main} ml-15`}>
				<Outlet />
			</div>
		</div>
	);
};
