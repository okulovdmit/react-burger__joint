//import { useState } from 'react';
import s from './app.module.scss';
import { Header } from '../app-header/app-header';

export const App = () => {
	return (
		<div className={s.page}>
			<Header />
		</div>
	);
};
