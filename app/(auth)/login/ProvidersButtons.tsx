import { useEffect, useState } from 'react';
import { ClientSafeProvider, LiteralUnion, getProviders, signIn } from "next-auth/react";
import { BuiltInProviderType } from 'next-auth/providers/index';
import { SquareButton } from '@components/FormElements/Buttons';

export const ProvidersButtons = ({ loading }: { loading: () => void; }) => {

  const [providers, setProviders] = useState<
    Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null
  >(null);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  const onGoogleLogin = () => {
    loading();
    providers?.google && signIn(providers.google.id);
  };

  return (
    <SquareButton
      text='Login with Google'
      onClick={onGoogleLogin}
      disabled={!providers?.google}
    />
  );
};
