import {
	ConstructorElement,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import sIngredients from './constructor-ingredients.module.scss';

export const ConsctructorIngredients = ({ data }) => {
	return (
		<div className={`${sIngredients.group} m-4 custom-scroll`}>
			{data.map((item) => (
				<div key={item._id} className={sIngredients.item}>
					<DragIcon type='primary' />
					<ConstructorElement
						text={item.name}
						price={item.price}
						thumbnail={item.image}
					/>
				</div>
			))}
		</div>
	);
};
