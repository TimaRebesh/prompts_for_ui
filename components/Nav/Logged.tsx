"use client";
import Link from 'next/link';
import React, { useState } from 'react';
import { signOut, useSession } from "next-auth/react";
import { Avatar } from '@components/FormElements/Avatar';

enum NAV {
  CREATE_PROMPT = 'Create Prompt',
  SING_OUT = 'Log Out',
  MY_PROFILE = 'My Profile'
}

const Logged = () => {
  return (
    <>
      <DesktopNav />
      <MobileNav />
    </>
  );
};

const DesktopNav = () => {
  const { data: session } = useSession();

  return (
    <div className='sm:flex hidden'>
      <div className='flex gap-3 md:gap-5'>
        <Link href='/create-prompt' className='black_btn'>
          {NAV.CREATE_PROMPT}
        </Link>

        <button type='button' onClick={() => signOut()} className='outline_btn'>
          {NAV.SING_OUT}
        </button>

        <Link href='/my-profile'>
          <Avatar
            src={session?.user?.image}
            alt='user_avatar'
          />
        </Link>
        {session?.user && <div>
          <h1 className='font-semibold'>{session?.user.username}</h1>
          {session?.user.isAdmin && <span className='text-blue-500 text-sm'>(admin)</span>}
        </div>}
      </div>
    </div>
  );
};

const MobileNav = () => {

  const { data: session } = useSession();
  const [toggleDropdown, setToggleDropdown] = useState(false);

  return (
    <div className='sm:hidden flex relative'>
      <div className='flex'>
        <Avatar
          src={session?.user?.image}
          alt='user_avatar'
          onClick={() => setToggleDropdown(prev => !prev)}
        />
        {toggleDropdown && (
          <div className='dropdown'>
            <Link
              href='/my-profile'
              className='dropdown_link'
              onClick={() => setToggleDropdown(false)}
            >
              {NAV.MY_PROFILE}
            </Link>
            <Link
              href='/create-prompt'
              className='dropdown_link'
              onClick={() => setToggleDropdown(false)}
            >
              {NAV.CREATE_PROMPT}
            </Link>
            <button
              type='button'
              onClick={() => {
                setToggleDropdown(false);
                signOut();
              }}
              className='mt-5 w-full black_btn'
            >
              {NAV.SING_OUT}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};


export default Logged;