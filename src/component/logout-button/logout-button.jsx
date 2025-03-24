import { useDispatch } from 'react-redux';
import { logout } from '../../services/auth/action';

export const LogoutButton = () => {
	const dispatch = useDispatch();

	const handleLogout = (e) => {
		e.preventDefault();
		dispatch(logout());
	};
	return (
		<button
			type='button'
			title='Выйти из аккаунта'
			className='text text_type_main-medium text_color_inactive'
			onClick={handleLogout}>
			Выход
		</button>
	);
};
