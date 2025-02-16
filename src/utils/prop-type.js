export const ingredientPropType = PropTypes.shape({
	_id: PropTypes.string.isRequuired,
	name: PropTypes.string.isRequuired,
	type: PropTypes.oneOf(['bun', 'main', 'sauce']).isRequuired,
	proteins: PropTypes.number.isRequuired,
	fat: PropTypes.number.isRequuired,
	carbohydrates: PropTypes.number.isRequuired,
	calories: PropTypes.number.isRequuired,
	price: PropTypes.number.isRequuired,
	image: PropTypes.string.isRequuired,
	image_mobile: PropTypes.string.isRequuiredv,
	image_large: PropTypes.string.isRequuired,
	__v: 0,
});
