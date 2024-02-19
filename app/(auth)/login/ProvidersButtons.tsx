import { useEffect, useMemo, useState } from 'react';
import { ClientSafeProvider, LiteralUnion, getProviders, signIn } from "next-auth/react";
import { BuiltInProviderType } from 'next-auth/providers/index';
import { SquareButton } from '@components/FormElements/Buttons';

export const ProvidersButtons = () => {

  const [providers, setProviders] = useState<
    Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null
  >(null);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  return (
    <SquareButton
      text='Login with Google'
      onClick={() => providers?.google && signIn(providers.google.id)}
      disabled={!providers?.google}
    />
  );
};
