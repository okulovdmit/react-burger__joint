// src/components/section/section.jsx
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
export const Section = ({
	id,
	children,
	classname,
	label,
	onVisibilityChange,
}) => {
	const { ref, inView } = useInView({
		threshold: 0.4,
	});

	useEffect(() => {
		if (inView) {
			onVisibilityChange(id);
		}
	}, [inView, id, onVisibilityChange]);

	return (
		<div ref={ref} id={id}>
			<h2 className={'text text_type_main-medium mt-10'}>{label}</h2>
			<div className={classname}>{children}</div>
		</div>
	);
};
