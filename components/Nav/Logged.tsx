"use client";
import Link from 'next/link';
import Image from "next/image";
import React, { useState } from 'react';
import { signOut, useSession } from "next-auth/react";

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
          <UserImage
            image={session?.user?.image}
          />
        </Link>

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
        <UserImage
          image={session?.user?.image}
          onClick={() => setToggleDropdown(prev => !prev)}
        />
        {toggleDropdown && (
          <div className='dropdown'>
            <Link
              href='/profile'
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

const UserImage = ({
  onClick,
  image
}: {
  onClick?: () => void;
  image: string | null | undefined;
}) => (
  <Image
    src={image || `/assets/icons/noavatar.png`}
    width={37}
    height={37}
    className='rounded-full'
    alt='profile'
    onClick={onClick}
  />
);


export default Logged;