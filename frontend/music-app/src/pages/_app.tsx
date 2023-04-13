import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Layout from '@/containers/Layout';


export default function App({ Component, pageProps }: AppProps) {
	return(
		<Layout>
			<Component {...pageProps} />
		</Layout>
	);
}
