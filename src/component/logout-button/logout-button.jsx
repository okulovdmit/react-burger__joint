import { useDispatch } from 'react-redux';
import { logout } from '../../services/auth/action';
import { useNavigate } from 'react-router-dom';

export const LogoutButton = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogout = (e) => {
		e.preventDefault();
		dispatch(logout());
		navigate('/login');
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
