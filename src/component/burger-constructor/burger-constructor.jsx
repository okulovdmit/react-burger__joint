import * as PropTypes from 'prop-types';
import sConstructor from './burger-constructor.module.scss';
import Bun from './bun';
import { ConsctructorIngredients } from '../constructor-ingredients/constructor-ingredients';
import {
	CurrencyIcon,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientPropType } from '../../utils/prop-type';

const BurgerConstructor = ({ getOrder, ingredients }) => {
	const filterOther = ingredients.filter((el) => el.type !== 'bun');
	const filterBun = ingredients.filter((el) => el.type === 'bun');

	return (
		<section className={`${sConstructor.main} mt-6 pr-4`}>
			<Bun type={'top'} bun={filterBun} text={'верх'} />
			<ConsctructorIngredients data={filterOther} />
			<Bun type={'bottom'} bun={filterBun} text={'низ'} />
			<div className={`${sConstructor.total} mt-10 mr-4`}>
				<div className={sConstructor.cost}>
					<p className={'text text_type_main-medium'}>1000</p>
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
