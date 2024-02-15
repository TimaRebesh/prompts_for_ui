"use client";
import Logo from "./Logo";
import Logged from "./Logged";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Nav = () => {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Logo />
      {session?.user ?
        <Logged />
        :
        <button
          type='button'
          onClick={() => { router.push('/login'); }}
          className='black_btn'
        >Log in</button>
      }
    </nav >
  );
};

export default Nav;