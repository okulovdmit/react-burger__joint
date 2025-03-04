import * as PropTypes from 'prop-types';
import sConstructor from './burger-constructor.module.scss';
import Bun from './bun';
import { ConsctructorIngredients } from '../constructor-ingredients/constructor-ingredients';
import {
	CurrencyIcon,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientPropType } from '../../utils/prop-type';
import {
	getSelectedBun,
	getSelectedIngredients,
} from '../../services/ingredients/reducer';
import { useSelector } from 'react-redux';

const BurgerConstructor = ({ getOrder, onDropHandler, onHandlerDelete }) => {
	const bun = useSelector(getSelectedBun);
	const ingredients = useSelector(getSelectedIngredients);

	const ingredientsCost = ingredients.reduce(
		(acc, item) => acc + item.price,
		0
	);
	const bunCost = bun ? bun.price * 2 : 0;
	const total = bunCost + ingredientsCost;

	return (
		<section className={`${sConstructor.main} mt-6 pr-4`}>
			<Bun type={'top'} text={'верх'} onDropHandler={onDropHandler} />
			<ConsctructorIngredients
				onDropHandler={onDropHandler}
				onHandlerDelete={onHandlerDelete}
			/>
			<Bun type={'bottom'} text={'низ'} onDropHandler={onDropHandler} />
			<div className={`${sConstructor.total} mt-10 mr-4`}>
				<div className={sConstructor.cost}>
					<p className={'text text_type_main-medium'}>{total ? total : 0}</p>
					<CurrencyIcon type='primary' />
				</div>
				<Button
					htmlType='button'
					type='primary'
					size='large'
					onClick={() => getOrder()}>
					Оформить заказ
				</Button>
			</div>
		</section>
	);
};

BurgerConstructor.propTypes = {
	ingredients: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
};

export default BurgerConstructor;
