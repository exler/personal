import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Header from '../components/Header'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="container">
      <Head>
        <link href="https://fonts.bunny.net/css?family=inter:400,700" rel="stylesheet" />
      </Head>
      <Header />
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
