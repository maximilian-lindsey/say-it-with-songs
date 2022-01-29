import { useSession, signIn, signOut } from "next-auth/react";
import Head from "next/head";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";

export default function Home() {
  const { data: session } = useSession();

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
        {session && session ? (
          <>
            Signed in as {session.user?.name} <br />
            <button onClick={() => signOut()}>Sign out</button>
            <p>
              <a href="/api/playlists">Playlists</a>
            </p>
            <p>
              <a href="/api/search">Search</a>
            </p>
          </>
        ) : (
          <>
            Not signed in <br />
            <button onClick={() => signIn()}>Sign in</button>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
