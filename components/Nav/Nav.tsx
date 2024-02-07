"use client";
import Logo from "./Logo";
import Logged from "./Logged";
import UnLogged from "./UnLogged";
import { useEffect, useMemo, useState } from "react";
import { getProviders, ClientSafeProvider, LiteralUnion } from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers/index";

const Nav = () => {
  const isLogged = true;
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
    <nav className='flex-between w-full mb-16 pt-3'>
      <Logo />
      {isLogged ?
        <Logged />
        :
        <UnLogged providers={providersValues} />
      }
    </nav >
  );
};

export default Nav;