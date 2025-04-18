import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { TStateTabs } from '@components/burger-ingredients/burger-ingredients';

type TSectionProps = {
	id: TStateTabs;
	children: React.ReactElement;
	classname: string;
	label: string;
	onVisibilityChange: (id: TStateTabs) => void;
};

export const Section = ({
	id,
	children,
	classname,
	label,
	onVisibilityChange,
}: TSectionProps): React.JSX.Element => {
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
