import React from 'react';
import styles from './order-info.module.scss';
import {
	CurrencyIcon,
	FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppSelector } from '../../services/store';
import { getAllIngredients } from '../../services/ingredients/reducer';

export const OrderInfo = (): React.JSX.Element => {
	const ingredients = useAppSelector(getAllIngredients);
	const date = '2021-06-23T14:43:22.587Z';

	return (
		<div className={styles.container}>
			<p className={`${styles.number} text text_type_digits-default mb-10`}>
				#12345
			</p>
			<p className='text text_type_main-medium mb-3'>Black Hole</p>
			<p className='text text_type_main-default mb-15'>Выполнен</p>
			<p className='text text_type_main-medium mb-6'>Состав:</p>
			<div className={`${styles.main} mb-10`}>
				{ingredients.map((item, index) => (
					<>
						<div className={`${styles.detailes} mb-4`}>
							<div className={`${styles.border} mr-4`} key={index}>
								<img
									className={styles.image}
									src={item.image_mobile}
									alt={''}
								/>
							</div>
							<p>{item.name}</p>
							<div className={`${styles.cost} ml-4`}>
								<p className={'text text_type_digits-default'}>{item.price}</p>
								<CurrencyIcon type='primary' />
							</div>
						</div>
					</>
				))}
			</div>
			<div className={styles.footer}>
				<FormattedDate
					date={new Date(date)}
					className='text text_type_main-default text_color_inactive'
				/>
				<div className={styles.cost}>
					<p className={'text text_type_digits-default'}>1234</p>
					<CurrencyIcon type='primary' />
				</div>
			</div>
		</div>
	);
};
