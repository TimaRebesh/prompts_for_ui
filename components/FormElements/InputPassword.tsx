import Image from 'next/image';
import React, { useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface PIProps {
  label: string;
  registration?: UseFormRegisterReturn<string>;
  alert?: string,
}

export const InputPassword = ({
  label,
  registration,
  alert,
  ...rest
}: PIProps) => {

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <label htmlFor="password">
        <span className="font-satoshi text-gray-700">
          {label}
        </span>
        <div className='relative'>
          <input
            {...registration}
            type={showPassword ? 'text' : 'password'}
            placeholder="************"
            className={`form_input ${alert && "input_alert"}`}
            {...rest}
          />
          {alert && <p className="text-xs text-red-700 pl-2">{alert}</p>}
          <Image
            className='absolute top-3 right-4'
            src={showPassword ? '/assets/icons/eye-crossed-svgrepo-com.svg'
              : '/assets/icons/eye-svgrepo-com.svg'}
            alt='eye'
            width={22}
            height={22}
            onClick={() => setShowPassword(prev => !prev)}
          />
        </div>
      </label >
    </div >
  );
};

