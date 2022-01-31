import { useSession, signIn, signOut } from "next-auth/react";
import { copy } from "../../content/en-us";
import { Auth } from "../Auth /Auth";
import Header from "../Header/Header";
import { Tracks } from "../Tracks/Tracks";

import styles from "./App.module.scss";

export const App = () => {
  const { data: session } = useSession();
  return (
    <main className={styles.app}>
      <Header title={copy.header.title} description={copy.header.description} />
      <Auth>
        <Tracks />
      </Auth>
      {/* {session && session ? (
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
      )} */}
    </main>
  );
};
