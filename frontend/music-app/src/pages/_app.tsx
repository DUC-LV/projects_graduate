import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Layout from '@/containers/Layout';
import "../styles.css";
import NextNProgress from 'nextjs-progressbar';
export default function App({ Component, pageProps }: AppProps) {
	return(
		<Layout>
			<NextNProgress
				color='#1976d2'
				startPosition={0.3}
				stopDelayMs={200}
				height={3}
				showOnShallow={true}
			/>
			<Component {...pageProps} />
		</Layout>
	);
}
