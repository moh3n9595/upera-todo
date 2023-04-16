import {memo} from 'react';

import useTranslation from 'next-translate/useTranslation';

import {Button} from './Button.common';

export interface ErrorStateProps {
	text?: string;
	tryAgain?: () => void;
}

const ErrorState = ({text, tryAgain}: ErrorStateProps) => {
	const {t} = useTranslation('common');
	return (
		<div className='flex flex-col justify-center items-center w-full my-4'>
			<p className='text-gray-600 text-center'>{text || t('ERROR_STATE.TEXT')}</p>
			{tryAgain && <Button className='mt-4'>{t('ERROR_STATE.TRY_AGAIN')}</Button>}
		</div>
	);
};

const MemoizedErrorState = memo(ErrorState);
export {MemoizedErrorState as ErrorState};
