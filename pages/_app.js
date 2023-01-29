import '@/styles/globals.css';
import Head from 'next/head';

import { Provider } from 'react-redux';
import { store } from '@/redux/store';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Game Center</title>
        <meta name="description" content="Game Center" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  )
}
