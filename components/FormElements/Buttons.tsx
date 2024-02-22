import { ButtonHTMLAttributes, ImgHTMLAttributes } from "react";
import Image from "next/image";

interface Button extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  img?: ImgHTMLAttributes<HTMLImageElement>;
}

export const SubmitButton = ({
  text,
  className,
  ...rest
}: Button) => (
  <button
    className={`blue_btn ${rest.disabled && 'disabled'} ${className}`}
    {...rest}
  >{text}</button>
);

export const SquareButton = ({
  text,
  className,
  img,
  ...rest
}: Button) => (
  <button
    className={`square_btn ${rest.disabled && 'disabled'} ${className}`}
    {...rest}
  >
    {img &&
      <Image
        src={img.src ?? ''}
        alt='user_image'
        width={40}
        height={40}
        className='rounded-full object-contain pr-2'
      />
    }
    {text}</button>
);
