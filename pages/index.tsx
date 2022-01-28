import Head from 'next/head'
import Footer from '../components/Footer'
import Header from '../components/Header'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Say It With Songs</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title="Say It With Songs" />
        <p className="description">
          Say it with songs by generating Spotify playlists
        </p>
        <a href="">Login to Spotify</a>
      </main>

      <Footer />
    </div>
  )
}
