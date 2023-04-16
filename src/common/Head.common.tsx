import {memo} from 'react';

import NextHead from 'next/head';
import useTranslation from 'next-translate/useTranslation';

import {PAGE_TITLE_SUFFIX} from '@upera/constants';

export interface HeadProps {
	ns?: string;
	title?: string;
	description?: string;
}

const Head = ({ns, title, description}: HeadProps) => {
	const {t} = useTranslation(ns);

	return (
		<NextHead>
			<title>{(title ?? t('HEAD_SEO.TITLE')) + PAGE_TITLE_SUFFIX}</title>
			<meta name='description' content={description ?? t('HEAD_SEO.DESCRIPTION')} />

			<meta name='viewport' content='width=device-width, initial-scale=1' />
			<link rel='icon' href='/favicon.ico' />
		</NextHead>
	);
};

const MemoizedHead = memo(Head);
export {MemoizedHead as Head};
