import sDetails from './ingredient-details.module.scss';
export default function IngredientDetails({ product }) {
	const { name, image, calories, proteins, fat, carbohydrates } = product;
	return (
		<div className={`${sDetails.details} mb-15`}>
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
