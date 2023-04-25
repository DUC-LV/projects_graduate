import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Layout from '@/containers/Layout';
import "../styles.css";
import NextNProgress from 'nextjs-progressbar';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useEffect, useState } from 'react';
import getCurrentUser from '@/services/getCurrentUser';
import { CurrentUserData } from '@/schemas';
import "swiper/swiper-bundle.min.css";

export default function App({ Component, pageProps }: AppProps) {
	const [currentUser, setCurrentUser] = useState<CurrentUserData>();
	useEffect(() => {
		if(!localStorage.getItem('access_token')){
			return;
		}
		getCurrentUser.getAll().then(res => {
			setCurrentUser(res?.data.data);
		})
	}, [])
	return(
		<Layout currentUser={currentUser ? currentUser : null}>
			<NextNProgress
				color='#1976d2'
				startPosition={0.3}
				stopDelayMs={200}
				height={3}
				showOnShallow={true}
			/>
			<ToastContainer
				autoClose={1000}
				position='top-right'
			/>
			<Component {...pageProps} />
		</Layout>
	);
}
