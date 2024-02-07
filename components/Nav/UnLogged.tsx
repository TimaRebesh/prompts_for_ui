import { ClientSafeProvider } from 'next-auth/react';
import { signIn } from "next-auth/react";

interface UnLoggedProps {
  providers: ClientSafeProvider[] | null;
}

const UnLogged = ({ providers }: UnLoggedProps) => {
  return (
    <>
      {providers &&
        providers.map((provider) => (
          <button
            type='button'
            key={provider.name}
            onClick={() => {
              signIn(provider.id);
            }}
            className='black_btn'
          >
            Sign in
          </button>
        ))}
    </>
  );
};

export default UnLogged;