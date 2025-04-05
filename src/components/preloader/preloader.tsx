import sPreloader from './preloader.module.css';
import React from 'react';

export const Preloader = (): React.JSX.Element => {
	return <div className={sPreloader.loader}></div>;
};
