import {ButtonHTMLAttributes, DetailedHTMLProps, PropsWithChildren, memo} from 'react';

import clsx from 'clsx';

const Button = ({
	children,
	...props
}: PropsWithChildren & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) => {
	return (
		<button
			{...props}
			className={clsx([
				'bg-orange/90 hover:bg-orange text-white font-bold py-2 px-4 border border-orange rounded',
				props.className,
			])}
		>
			{children}
		</button>
	);
};

const MemoizedButton = memo(Button);
export {MemoizedButton as Button};
