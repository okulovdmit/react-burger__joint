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
import { useNavigate } from 'react-router-dom';
import { useKey } from '../../hooks/use-key';
import { getUser } from '../../services/auth/reducer';
import { TCallbackWithIngredient } from '@utils/types';
import { useAppDispatch, useAppSelector } from '../../services/store';

export type TBurgerConstructorProps = {
	toggleOrder: () => void;
	onDropHandler: TCallbackWithIngredient;
	onHandlerDelete: (key: string, id: string) => void;
	onMoveIngredient: (arg: { dragIndex: number; hoverIndex: number }) => void;
};

const BurgerConstructor = ({
	toggleOrder,
	onDropHandler,
	onHandlerDelete,
	onMoveIngredient,
}: TBurgerConstructorProps): React.JSX.Element => {
	const dispatch = useAppDispatch();
	const bun = useAppSelector(getSelectedBun);
	const ingredients = useAppSelector(getSelectedIngredients); // need to change type
	const navigate = useNavigate();
	const user = useAppSelector(getUser);

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
		const ingredientIds: Array<string> = [];
		ingredients.forEach((ingredient) => {
			ingredientIds.push(ingredient._id);
		});
		if (bun) {
			ingredientIds.unshift(bun._id);
			ingredientIds.push(bun._id);
		}
		dispatch(getOrder(ingredientIds));
		toggleOrder();
	};

	useKey('Enter', gettingOrder);

	const buttonDisabled = bun && ingredients.length > 0 ? false : true;

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
					onClick={() => gettingOrder()}
					disabled={buttonDisabled}>
					Оформить заказ
				</Button>
			</div>
		</section>
	);
};

export default BurgerConstructor;
