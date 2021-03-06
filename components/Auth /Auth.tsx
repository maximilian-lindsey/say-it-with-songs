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
import { text } from "../../content/en-us";
import { Button } from "../Button/Button";
import { Video } from "../Video/Video";

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
          <Video
            src="/intro.mp4"
            width={300}
            height={432}
            controls={false}
            autoPlay={true}
            loop={true}
            muted={true}
          />
          {Object.values(providers).map((provider) => (
            <div className={styles.signinButton} key={provider.name}>
              <Button
                isGhost={false}
                onClick={() => signIn(provider.id)}
              >{`${text.login.signin.title} ${provider.name}`}</Button>
              <a href="https://www.signupanywhere.com/signup/k4ctdvhi">
                {text.login.signin.cta}
              </a>
            </div>
          ))}
          <p className={styles.signinDescription}>
            {text.login.signin.description}
          </p>
        </div>
      )}
      {session && (
        <>
          <div className={styles.signout}>
            <p>{session.user?.name}</p>
            <Button isGhost={true} onClick={() => signOut()}>
              {text.login.signout.title}
            </Button>
          </div>

          {props.children}
        </>
      )}
    </>
  );
};
