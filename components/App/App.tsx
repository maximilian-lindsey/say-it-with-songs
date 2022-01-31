import { useSession, signIn, signOut } from "next-auth/react";
import Header from "../Header/Header";
import { Tracks } from "../Tracks/Tracks";

import styles from "./App.module.scss";

export const App = () => {
  const { data: session } = useSession();
  return (
    <main className={styles.app}>
      <Header title="Say It With Songs" />
      <p className="description">
        Say it with songs by generating Spotify playlists
      </p>
      {session && session ? (
        <>
          Signed in as {session.user?.name} <br />
          <button onClick={() => signOut()}>Sign out</button>
          <div>
            <Tracks />
          </div>
        </>
      ) : (
        <>
          Not signed in <br />
          <button onClick={() => signIn()}>Sign in</button>
        </>
      )}
    </main>
  );
};
