import { useCallback, useEffect } from 'react';
export function useKey(key = 'Enter', handler) {
	const handleKeyDown = useCallback(
		(e) => {
			if (e.key === key) handler();
		},
		[key, handler]
	);
	useEffect(() => {
		window.addEventListener('keydown', handleKeyDown);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [handleKeyDown]);
}
