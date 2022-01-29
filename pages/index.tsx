import { useSession, signIn, signOut } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import { Words } from "../components/Words/Words";

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
            <div>
              <Link href="/api/search">
                <a>Search</a>
              </Link>
            </div>
            <div>
              <Words />
            </div>
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
