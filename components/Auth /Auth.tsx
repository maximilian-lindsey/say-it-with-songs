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
          <iframe
            src="https://open.spotify.com/embed/playlist/2Ahw8i0ORPqqvHla9iWJvn?utm_source=generator"
            width="100%"
            height="350"
            frameBorder="0"
            allowFullScreen={false}
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          ></iframe>
          {Object.values(providers).map((provider) => (
            <div className={styles.signinButton} key={provider.name}>
              <Button
                isGhost={false}
                onClick={() => signIn(provider.id)}
              >{`${copy.login.signin.title} ${provider.name}`}</Button>
            </div>
          ))}
          <p className={styles.signinDescription}>
            <span>{copy.login.signin.description} </span>
            <span>
              This app is still in early access mode and currently invite only.{" "}
            </span>
            {/* <span>To get access please </span>
            <a href="mailto:max@lindsey.digital?subject=Invite: Say It With Songs">
              contact me
            </a> */}
            .
          </p>
        </div>
      )}
      {session && (
        <>
          <div className={styles.signout}>
            <p>{session.user?.name}</p>
            <Button isGhost={true} onClick={() => signOut()}>
              {copy.login.signout.title}
            </Button>
          </div>

          {props.children}
        </>
      )}
    </>
  );
};
