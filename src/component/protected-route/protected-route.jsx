import { useSelector } from 'react-redux';
import { useLocation, Navigate } from 'react-router-dom';
import { getIsAuth, getUser } from '../../services/auth/reducer';
import { Preloader } from '../../component/preloader/preloader.jsx';

const Protected = ({ onlyUnAuth = false, component }) => {
	const user = useSelector(getUser);
	const isAuth = useSelector(getIsAuth);
	const location = useLocation();
	console.log('user', user);
	if (!isAuth) {
		return <Preloader />;
	}

	if (!onlyUnAuth && !user) {
		// для авторизованного, но не авторизован
		return <Navigate to='/login' state={{ from: location }} />;
	}

	if (onlyUnAuth && user) {
		// маршрут для неавторизованного, но авторизован
		const { from } = location.state ?? { from: { pathname: '/' } };
		return <Navigate to={from} />;
	}

	//onlyAuth && !user - для неавторизованного и неавторизован
	//!onlyUnAuth && user - для авторизованного и авторизован
	return component;
};

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({ component }) => {
	return <Protected onlyUnAuth={true} component={component} />;
};
