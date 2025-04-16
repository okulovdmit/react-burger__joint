import sIngredients from './constructor-ingredients.module.scss';
import { useDrop } from 'react-dnd';
import { getSelectedIngredients } from '../../services/ingredients/reducer';
import { RenderIngredient } from './render-ingredient';
import { TBurgerConstructorProps } from '../burger-constructor/burger-constructor';
import { TDataIngredient } from '@utils/types';
import { useAppSelector } from '../../services/store';

type TConstructorIngredientsProps = Pick<
	TBurgerConstructorProps,
	'onDropHandler' | 'onHandlerDelete' | 'onMoveIngredient'
>;

export const ConsctructorIngredients = ({
	onDropHandler,
	onHandlerDelete,
	onMoveIngredient,
}: TConstructorIngredientsProps): React.JSX.Element => {
	const ingredients = useAppSelector(getSelectedIngredients);
	const [, dropRef] = useDrop<TDataIngredient, unknown, unknown>({
		accept: 'ingredients',
		drop(item) {
			onDropHandler(item);
		},
	});
	return (
		<div
			ref={dropRef}
			className={`${sIngredients.group} m-4 mr-4 custom-scroll`}
			onClick={(e) => e.stopPropagation()}
			aria-hidden='true'>
			{ingredients.length > 0 ? (
				ingredients.map((item, index) => (
					<RenderIngredient
						key={item.key}
						item={item}
						index={index}
						onHandlerDelete={onHandlerDelete}
						onMoveIngredient={onMoveIngredient}
					/>
				))
			) : (
				<div className={`${sIngredients.text} text text_type_main-medium`}>
					Перетащите сюда ингредиенты
				</div>
			)}
		</div>
	);
};
