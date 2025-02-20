import sDetails from './ingredient-details.module.scss';
export default function IngredientDetails(props) {
	const { name, image, calories, proteins, fat } = props;
	return (
		<div className={`${sDetails.details} mb-15`}>
			<img src={image} alt='' />
			<p className={'text text_type_main-default mt-4'}>{name}</p>
			<section className={`${sDetails.info} mt-8`}>
				<div className={sDetails.item}>
					<p className={'text text_type_main-default'}>Калории, ккал</p>
					<p>{calories}</p>
				</div>
				<div className={sDetails.item}>
					<p className={'text text_type_main-default'}>Белки, г</p>
					<p>{proteins}</p>
				</div>
				<div className={sDetails.item}>
					<p className={'text text_type_main-default'}>Жиры, г</p>
					<p>{fat}</p>
				</div>
				<div className={sDetails.item}>
					<p className={'text text_type_main-default'}>Углеводы, г</p>
					<p>{carbohydrates}</p>
				</div>
			</section>
		</div>
	);
}
