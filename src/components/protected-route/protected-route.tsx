import { useLocation, Navigate } from 'react-router-dom';
import { getIsAuthChecked, getUser } from '../../services/auth/reducer';
import { Preloader } from '../preloader/preloader';
import React from 'react';
import { useAppSelector } from '../../services/store';

type TProtectedProps = {
	onlyUnAuth?: boolean;
	component: React.ReactElement;
};

const Protected = ({
	onlyUnAuth = false,
	component,
}: TProtectedProps): React.ReactElement => {
	const user = useAppSelector(getUser);
	const isAuth = useAppSelector(getIsAuthChecked);
	const location = useLocation();

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
export const OnlyUnAuth = ({
	component,
}: {
	component: React.ReactElement;
}): React.ReactElement => {
	return <Protected onlyUnAuth={true} component={component} />;
};
