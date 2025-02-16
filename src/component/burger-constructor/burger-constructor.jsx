import sConstructor from './burger-constructor.module.scss';
import { ingridientsData } from '@utils/data';
import {
	ConstructorElement,
	DragIcon,
	CurrencyIcon,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

export const BurgerConstructor = () => {
	const filterOther = ingridientsData.filter((el) => el.type !== 'bun');
	const filterBun = ingridientsData.filter((el) => el.type === 'bun');
	return (
		<div className={`${sConstructor.main} mt-6`}>
			<ConstructorElement
				type='top'
				isLocked={true}
				text={filterBun[0].name}
				price={filterBun[0].price}
				thumbnail={filterBun[0].image}
			/>
			<div className={`${sConstructor.group} m-4`}>
				{filterOther.map((item) => (
					<div key={item.id} className={sConstructor.item}>
						<DragIcon type='primary' />
						<ConstructorElement
							text={item.name}
							price={item.price}
							thumbnail={item.image}
						/>
					</div>
				))}
			</div>
			<ConstructorElement
				type='bottom'
				isLocked={true}
				text={filterBun[0].name}
				price={filterBun[0].price}
				thumbnail={filterBun[0].image}
			/>
			<div className={`${sConstructor.total} mt-10 mr-4`}>
				<div className={sConstructor.cost}>
					<p className={'text text_type_main-medium'}>1000</p>
					<CurrencyIcon type='primary' />
				</div>
				<Button htmlType='button' type='primary' size='large'>
					Оформить заказ
				</Button>
			</div>
		</div>
	);
};
