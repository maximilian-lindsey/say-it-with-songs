import { useSession, signIn, signOut } from "next-auth/react";
import Head from "next/head";
import { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { PlaylistType } from "../lib/spotify-types";

export default function Home() {
  const { data: session } = useSession();
  const [list, setList] = useState([]);

  const getMyPlaylists = async () => {
    const res = await fetch("/api/playlists");
    const { items } = await res.json();
    setList(items);
  };
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
            <p>
              <button onClick={() => getMyPlaylists()}>
                Get all my playlists
              </button>
              {list.map((item: PlaylistType) => (
                <div key={item.id}>
                  <h1>{item.name}</h1>
                  <img
                    src={
                      (item.images &&
                        item.images.length >= 0 &&
                        item.images[0].url) ||
                      ""
                    }
                    width="100"
                  />
                </div>
              ))}
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
