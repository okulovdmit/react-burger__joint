import sDetails from './ingredient-details.module.scss';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useParams } from 'react-router-dom';
import { getAllIngredients } from '../../services/ingredients/reducer';
import { TDataIngredient } from '@utils/types';
import React from 'react';
import { useAppSelector } from '../../services/store';

type TIngredientDetailesProps = {
	product?: TDataIngredient | null;
	toggle: () => void;
	isPopup?: boolean;
};

export default function IngredientDetails({
	product,
	toggle,
	isPopup = false,
}: TIngredientDetailesProps): React.JSX.Element {
	const { ingredientId: id } = useParams();
	const data = useAppSelector(getAllIngredients);
	const productId = data.filter((item) => item._id === id)[0];
	const { name, image, calories, proteins, fat, carbohydrates } = product
		? product
		: productId;
	const titlePosition = isPopup ? 'space-between' : 'center';
	return (
		<div className={`${sDetails.details}`}>
			<header
				className={`${sDetails.header}`}
				style={{ justifyContent: titlePosition }}>
				<h2 className={'text text_type_main-large'}>Детали заказа</h2>
				{isPopup && (
					<CloseIcon
						type='primary'
						className={sDetails.close}
						onClick={toggle}
					/>
				)}
			</header>
			<img src={image} alt='{name}' className={sDetails.image} />
			<p className={'text text_type_main-medium mt-4'}>{name}</p>
			<section className={`${sDetails.info} mt-8`}>
				<div className={sDetails.item}>
					<p className={'text text_type_main-small'}>Калории, ккал</p>
					<p className={'text text_type_digits-default'}>{calories}</p>
				</div>
				<div className={sDetails.item}>
					<p className={'text text_type_main-small'}>Белки, г</p>
					<p className={'text text_type_digits-default'}>{proteins}</p>
				</div>
				<div className={sDetails.item}>
					<p className={'text text_type_main-small'}>Жиры, г</p>
					<p className={'text text_type_digits-default'}>{fat}</p>
				</div>
				<div className={sDetails.item}>
					<p className={'text text_type_main-small'}>Углеводы, г</p>
					<p className={'text text_type_digits-default'}>{carbohydrates}</p>
				</div>
			</section>
		</div>
	);
}
