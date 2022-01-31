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
      {!session &&
        providers &&
        Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button onClick={() => signIn(provider.id)}>
              Sign in with {provider.name}
            </button>
          </div>
        ))}
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
