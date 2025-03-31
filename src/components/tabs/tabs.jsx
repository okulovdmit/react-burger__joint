import sTabs from './tabs.module.scss';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

export const Tabs = ({ activeTab, setActiveTab }) => {
	return (
		<div className={`${sTabs.tabs} mt-5`}>
			<Tab
				value='булки'
				active={activeTab === 'булки'}
				onClick={() => {
					setActiveTab('булки');
					document
						.getElementById('булки')
						.scrollIntoView({ behavior: 'smooth' });
				}}>
				Булки
			</Tab>
			<Tab
				value='соусы'
				active={activeTab === 'соусы'}
				onClick={() => {
					setActiveTab('соусы');
					document
						.getElementById('соусы')
						.scrollIntoView({ behavior: 'smooth' });
				}}>
				Соусы
			</Tab>
			<Tab
				value='начинки'
				active={activeTab === 'начинки'}
				onClick={() => {
					setActiveTab('начинки');
					document
						.getElementById('начинки')
						.scrollIntoView({ behavior: 'smooth' });
				}}>
				Начинки
			</Tab>
		</div>
	);
};
