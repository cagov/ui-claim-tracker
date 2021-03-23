import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Placeholder Claimtracker App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to the Placeholder Claimtracker App
        </h1>

        <div>
          <iframe width="560" height="315" src="https://www.youtube.com/embed/EIyixC9NsLI" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </div>

      </main>

      <footer className={styles.footer}>
        <a
          href="https://navapbc.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by NavaPBC
        </a>
      </footer>
    </div>
  )
}
