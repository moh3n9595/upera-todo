import {memo} from 'react';

import useTranslation from 'next-translate/useTranslation';

const NotFound = () => {
	const {t} = useTranslation('common');
	return (
		<div className='flex justify-center items-center w-full my-4'>
			<p className='text-gray-600'>{t('NOT_FOUND.TEXT')}</p>
		</div>
	);
};

const MemoizedNotFound = memo(NotFound);
export {MemoizedNotFound as NotFound};
