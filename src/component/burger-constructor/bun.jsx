import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
export default function Bun({ type, bun, text }) {
	return (
		<div className={'mr-10'}>
			<ConstructorElement
				type={type}
				isLocked={true}
				text={`${bun[0].name} (${text})`}
				price={bun[0].price}
				thumbnail={bun[0].image}
				className={'mr-10'}
			/>
		</div>
	);
}
