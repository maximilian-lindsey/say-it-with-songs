import { BuiltInProviderType } from "next-auth/providers";
import {
  ClientSafeProvider,
  getProviders,
  LiteralUnion,
  signIn,
  signOut,
  useSession,
} from "next-auth/react";
import { useEffect, useState } from "react";
import { copy } from "../../content/en-us";
import { Button } from "../Button/Button";

import styles from "./Auth.module.scss";

type Provider = Record<
  LiteralUnion<BuiltInProviderType, string>,
  ClientSafeProvider
>;

export const Auth: React.FunctionComponent = (props) => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState({} as Provider);

  useEffect(() => {
    if (!session) {
      loadProviders();
    }
  }, []);

  const loadProviders = async () => {
    const providers = await getProviders();
    if (providers) setProviders(providers);
  };

  return (
    <>
      {!session && providers && (
        <div className={styles.signin}>
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <Button
                onClick={() => signIn(provider.id)}
              >{`${copy.login.signin.title} ${provider.name}`}</Button>
            </div>
          ))}
        </div>
      )}
      {session && (
        <>
          Signed in as {session.user?.name} <br />
          <button onClick={() => signOut()}>Sign out</button>
          {props.children}
        </>
      )}
    </>
  );
};
