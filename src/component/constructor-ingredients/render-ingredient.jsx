import { useDrop, useDrag } from 'react-dnd';
import { useRef } from 'react';
import {
	ConstructorElement,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import sIngredients from './constructor-ingredients.module.scss';

export const RenderIngredient = ({
	item,
	index,
	onHandlerDelete,
	onMoveIngredient,
}) => {
	const ref = useRef(null);

	const [{ handlerId }, dragRef] = useDrag({
		type: 'ingredient',
		item: { type: 'ingredient', index },
		collect: (monitor) => ({
			handlerId: monitor.getHandlerId(),
		}),
	});

	const [, drop] = useDrop({
		accept: 'ingredient',
		hover(item, monitor) {
			if (!ref.current) {
				return;
			}
			const dragIndex = item.index;
			const hoverIndex = index;
			if (dragIndex === hoverIndex) {
				return;
			}

			const hoverBoundingRect = ref.current.getBoundingClientRect();
			const hoverMiddleY =
				(hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

			const clientOffset = monitor.getClientOffset();

			const hoverClientY = clientOffset.y - hoverBoundingRect.top;

			const isBelowHoverMiddle =
				dragIndex < hoverIndex && hoverClientY < hoverMiddleY;
			const isAboveHoverMiddle =
				dragIndex > hoverIndex && hoverClientY > hoverMiddleY;

			if (isBelowHoverMiddle || isAboveHoverMiddle) {
				onMoveIngredient({ dragIndex, hoverIndex });
				item.index = hoverIndex;
			}
		},
		collect: (monitor) => ({
			isOver: monitor.isOver(),
		}),
	});

	dragRef(drop(ref));

	return (
		<div className={sIngredients.item} ref={ref} data-handler-id={handlerId}>
			<DragIcon type='primary' />
			<ConstructorElement
				text={item.name}
				price={item.price}
				thumbnail={item.image}
				handleClose={() => onHandlerDelete(item.key, item._id)}
			/>
		</div>
	);
};
