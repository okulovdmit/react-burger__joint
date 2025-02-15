import { useState } from 'react';
import s from './app.module.scss';

export const App = () => {
	// const num = 0
	const [count, setCount] = useState(0);

	return (
		<div className='page'>
			<h1>React + TS</h1>
			<div className={s.card}>
				<button onClick={() => setCount((count) => count + 1)}>
					count is {count}
				</button>
			</div>
		</div>
	);
};
