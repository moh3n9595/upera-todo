import {Html, Head, Main, NextScript, DocumentProps} from 'next/document';

export default function Document(props: DocumentProps) {
	return (
		<Html lang={props.locale} className='bg-white'>
			<Head />
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
