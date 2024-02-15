import { useEffect, useMemo, useState } from 'react';
import { ClientSafeProvider, LiteralUnion, getProviders, signIn } from "next-auth/react";
import { BuiltInProviderType } from 'next-auth/providers/index';
import { SquareButton } from '@components/Buttons/Buttons';

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

  const providersValues = useMemo(() => {
    return providers ? Object.values(providers) : null;
  }, [providers]);

  return (
    <>
      {providersValues && providersValues.map((provider) => (
        <SquareButton
          key={provider.name}
          text={`Login with ${provider.name}`}
          onClick={() => signIn(provider.id)}
        />
      ))}
    </>
  );
};
