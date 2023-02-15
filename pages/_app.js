import Head from 'next/head';
import NextNProgress from 'nextjs-progressbar';

import { Provider } from 'react-redux';
import { store } from '@/redux/store';

import '@/styles/globals.scss';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Provider store={store}>
        <NextNProgress color="#29D" startPosition={0.3} stopDelayMs={200} height={3} showOnShallow={true} />
        <Component {...pageProps} />
      </Provider>
    </>
  )
}