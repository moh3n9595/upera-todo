import {NextPage} from 'next';
import {AppProps as NextAppProps} from 'next/app';

import {LayoutType} from './layout.type';

export type Page<P = unknown> = NextPage<P> & {
	layout?: LayoutType;
	ns?: string;
};

export type AppProps = NextAppProps & {
	Component: Page;
};
