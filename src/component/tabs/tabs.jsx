import sTabs from './tabs.module.scss';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';

export const Tabs = () => {
	const [current, setCurrent] = useState('one');
	return (
		<div className={`${sTabs.tabs} mt-5 `}>
			<Tab value='one' active={current === 'one'} onClick={setCurrent}>
				Булки
			</Tab>
			<Tab value='two' active={current === 'two'} onClick={setCurrent}>
				Соусы
			</Tab>
			<Tab value='three' active={current === 'three'} onClick={setCurrent}>
				Начинки
			</Tab>
		</div>
	);
};
