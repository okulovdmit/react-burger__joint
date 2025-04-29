import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrop } from 'react-dnd';
import sBun from './burger-constructor.module.scss';
import { getSelectedBun } from '../../services/ingredients/reducer';
import { TDataIngredient, TCallbackWithIngredient } from '@utils/types';
import { useAppSelector } from '../../services/store';

type TBunProps = {
	type: 'top' | 'bottom';
	text: string;
	onDropHandler: TCallbackWithIngredient;
};

export default function Bun({
	type,
	text,
	onDropHandler,
}: TBunProps): React.JSX.Element {
	const bun = useAppSelector(getSelectedBun);
	const [, dropRef] = useDrop<TDataIngredient, unknown, unknown>({
		accept: 'ingredients',
		drop(item) {
			onDropHandler(item);
		},
	});
	return (
		<div ref={dropRef} className={'mr-10'}>
			{bun ? (
				<ConstructorElement
					type={type}
					isLocked={true}
					text={`${bun.name} (${text})`}
					price={bun.price}
					thumbnail={`${bun.image}`}
					extraClass={'mr-10'}
				/>
			) : (
				<div className={`${sBun.bun} text text_type_main-medium`}>
					Выберите булку
				</div>
			)}
		</div>
	);
}
