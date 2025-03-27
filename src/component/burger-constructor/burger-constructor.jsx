import * as PropTypes from 'prop-types';
import sConstructor from './burger-constructor.module.scss';
import Bun from './bun';
import { ConsctructorIngredients } from '../constructor-ingredients/constructor-ingredients';
import {
	CurrencyIcon,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import {
	getSelectedBun,
	getSelectedIngredients,
} from '../../services/ingredients/reducer';
import { getOrder } from '../../services/ingredients/action';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useKey } from '../../hooks/use-key';
import { getUser } from '../../services/auth/reducer';

const BurgerConstructor = ({
	toggleOrder,
	onDropHandler,
	onHandlerDelete,
	onMoveIngredient,
}) => {
	const dispatch = useDispatch();
	const bun = useSelector(getSelectedBun);
	const ingredients = useSelector(getSelectedIngredients);
	const navigate = useNavigate();
	const user = useSelector(getUser);

	const ingredientsCost = ingredients.reduce(
		(acc, item) => acc + item.price,
		0
	);
	const bunCost = bun ? bun.price * 2 : 0;
	const total = bunCost + ingredientsCost;

	const gettingOrder = () => {
		if (!user) {
			return navigate('/login');
		}
		const ingredientIds = [];
		if (bun) {
			ingredientIds.push(bun._id);
		}
		ingredients.forEach((ingredient) => {
			ingredientIds.push(ingredient._id);
		});
		dispatch(getOrder(ingredientIds));
		toggleOrder();
	};

	useKey('Enter', gettingOrder);

	return (
		<section className={`${sConstructor.main} mt-6 pr-4`}>
			<Bun type={'top'} text={'верх'} onDropHandler={onDropHandler} />
			<ConsctructorIngredients
				onDropHandler={onDropHandler}
				onHandlerDelete={onHandlerDelete}
				onMoveIngredient={onMoveIngredient}
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
					onClick={() => gettingOrder()}>
					Оформить заказ
				</Button>
			</div>
		</section>
	);
};

BurgerConstructor.propTypes = {
	// ingredients: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
	toggleOrder: PropTypes.func.isRequired,
	onDropHandler: PropTypes.func.isRequired,
	onHandlerDelete: PropTypes.func.isRequired,
	onMoveIngredient: PropTypes.func.isRequired,
};

export default BurgerConstructor;
