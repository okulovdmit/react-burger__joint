import * as PropTypes from 'prop-types';
import sConstructor from './burger-constructor.module.scss';
import { ingridientsData } from '../../utils/data';
import { ConsctructorIngredients } from '../constructor-ingredients/constructor-ingredients';
import {
	ConstructorElement,
	CurrencyIcon,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientPropType } from '../../utils/prop-type';

const BurgerConstructor = () => {
	const filterOther = ingridientsData.filter((el) => el.type !== 'bun');
	const filterBun = ingridientsData.filter((el) => el.type === 'bun');
	return (
		<section className={`${sConstructor.main} mt-6 pr-4`}>
			<div className={'mr-10'}>
				<ConstructorElement
					type='top'
					isLocked={true}
					text={filterBun[0].name}
					price={filterBun[0].price}
					thumbnail={filterBun[0].image}
					className={'mr-10'}
				/>
			</div>
			<ConsctructorIngredients data={filterOther} />
			<div className={'mr-10'}>
				<ConstructorElement
					type='bottom'
					isLocked={true}
					text={filterBun[0].name}
					price={filterBun[0].price}
					thumbnail={filterBun[0].image}
				/>
			</div>
			<div className={`${sConstructor.total} mt-10 mr-4`}>
				<div className={sConstructor.cost}>
					<p className={'text text_type_main-medium'}>1000</p>
					<CurrencyIcon type='primary' />
				</div>
				<Button htmlType='button' type='primary' size='large'>
					Оформить заказ
				</Button>
			</div>
		</section>
	);
};

BurgerConstructor.propTypes = {
	ingredientsData: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
};

export default BurgerConstructor;
