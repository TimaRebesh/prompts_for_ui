import { ButtonHTMLAttributes } from "react";

interface Button extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
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
  ...rest
}: Button) => (
  <button
    className={`square_btn ${rest.disabled && 'disabled'} ${className}`}
    {...rest}
  >{text}</button>
);
