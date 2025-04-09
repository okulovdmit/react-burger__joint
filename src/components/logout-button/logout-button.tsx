import sButton from './logout-button.module.scss';
import { logout } from '../../services/auth/action';
import { useAppDispatch } from '../../services/store';

export const LogoutButton = () => {
	const dispatch = useAppDispatch();

	const handleLogout = () => {
		dispatch(logout());
	};
	return (
		<button
			type='button'
			title='Выйти из аккаунта'
			className={`${sButton.btn} text text_type_main-medium text_color_inactive`}
			onClick={handleLogout}>
			Выход
		</button>
	);
};
