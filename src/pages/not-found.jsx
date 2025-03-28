import sNot from './not-found.module.scss';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate } from 'react-router-dom';

export const NotFound = () => {
	const navigate = useNavigate();
	return (
		<div className={sNot.not}>
			<h1 className={'text text_type_main-large'}>Ошибка 404</h1>
			<p className={`${sNot.text} text text_type_main-default mt-4`}>
				Кажется что-то пошло не так! Страница, которую вы ищете, не существует.
				Возможно она устарела, была удалена, или был введен неверный адрес в
				адресной строке
			</p>
			<Button
				htmlType='button'
				type='primary'
				size='medium'
				onClick={() => navigate('/')}
				extraClass='mt-20'>
				Перейти на главную страницу
			</Button>
		</div>
	);
};
