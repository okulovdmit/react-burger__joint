export const ingredientsApiConfig = {
	baseUrl: 'https://norma.nomoreparties.space/api/ingredients',
	headers: {
		Authorization: 'Bearer db46c96636d926f767751cbe7aeb313963a2a4d9',
		'Content-Type': 'application/json',
	},
};

const getResponse = (res) => {
	if (res.ok) {
		return res.json();
	}

	return Promise.reject(`Ошибка ${res.status}`);
};

export const getIngredients = () => {
	return fetch(`${ingredientsApiConfig.baseUrl}`, {
		headers: ingredientsApiConfig.headers,
	}).then(getResponse);
};

export const getNumber = (ingredientIds) => {
	return fetch('https://norma.nomoreparties.space/api/orders', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ ingredients: ingredientIds }),
	}).then(getResponse);
};
