import {Vazirmatn} from 'next/font/google';
import {QueryClient, QueryClientProvider} from 'react-query';
import {ReactQueryDevtools} from 'react-query/devtools';

import {Head} from '@upera/common';
import {Layout} from '@upera/layouts';
import {AppProps} from '@upera/types';
import '@upera/styles/globals.css';

const vazirmatn = Vazirmatn({subsets: ['arabic']});
const queryClient = new QueryClient();

const App = ({Component, pageProps}: AppProps) => {
	return (
		<>
			<style jsx global>{`
				html {
					font-family: ${vazirmatn.style.fontFamily};
				}
			`}</style>
			<QueryClientProvider client={queryClient}>
				<Head ns={Component?.ns} />
				<Layout type={Component?.layout} ns={Component?.ns}>
					<Component {...pageProps} />
				</Layout>
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
		</>
	);
};

export default App;
