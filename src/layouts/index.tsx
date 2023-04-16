import {useMemo, PropsWithChildren} from 'react';

import {LayoutType} from '@upera/types';
import {Page} from '@upera/types';

import {MainLayout} from './Main.layout';

export interface LayoutProps extends PropsWithChildren {
	type?: keyof typeof LayoutType;
	ns?: Page['ns'];
}

export const Layout = ({children, type = 'Main', ns}: LayoutProps) => {
	const LayoutComponent = useMemo(() => {
		switch (type) {
			case LayoutType.Main:
				return MainLayout;

			default:
				return MainLayout;
		}
	}, [type]);

	return <LayoutComponent ns={ns}>{children}</LayoutComponent>;
};
