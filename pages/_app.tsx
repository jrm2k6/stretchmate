import '../styles/globals.css'
import styles from '../styles/Home.module.css'
import { AppProps } from 'next/app'
import Head from 'next/head'
import Link from 'next/link'


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Stretch Mate</title>
      </Head>

      <main className={styles.main}>
        <Component {...pageProps} />
      </main>
      <footer className={styles.footer}>
        Made in San Diego
      </footer>
    </div>

  )
}

export default MyApp
