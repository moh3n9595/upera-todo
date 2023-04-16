import {PropsWithChildren, memo} from 'react';

import {motion} from 'framer-motion';
import useTranslation from 'next-translate/useTranslation';

import {Page} from '@upera/types';

interface MainLayoutProps extends PropsWithChildren {
	ns?: Page['ns'];
}

const MainLayout = ({children, ns}: MainLayoutProps) => {
	const {t} = useTranslation(ns);
	return (
		<div className='bg-white'>
			<header className='bg-orange h-16 flex items-center justify-center shadow-md'>
				<motion.div
					initial={{scale: 0.6}}
					animate={{scale: 1}}
					transition={{duration: 0.5}}
					className='text-lg md:text-xl font-bold text-white'
				>
					{t('HEAD_SEO.TITLE', null, {fallback: ''}) || t('TITLE', null, {ns: 'layouts'})}
				</motion.div>
			</header>
			<main className='px-4 py-6 xl:px-0 max-w-screen-lg m-auto'>{children}</main>
		</div>
	);
};

const MemoizedMainLayout = memo(MainLayout);
export {MemoizedMainLayout as MainLayout};
