import sCard from './ingredinet-card.module.scss';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
export const IngredientCard = ({ data }) => {
	return (
		<div className={`${sCard.cards} mt-6`}>
			{data.map((item) => (
				<div key={item.id} className={sCard.card}>
					<img alt='bulka' src={item.image} />
					<div className={sCard.item}>
						<p className={'text text_type_main-medium'}>{item.price}</p>
						<CurrencyIcon type='primary' />
					</div>
					<div className={sCard.item}>
						<p className={'text text_type_main-default'}>{item.name}</p>
					</div>
				</div>
			))}
		</div>
	);
};
