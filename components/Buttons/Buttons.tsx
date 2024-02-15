import { ButtonHTMLAttributes } from "react";

interface Button<T> extends ButtonHTMLAttributes<T> {
  text?: string;
}

export const SubmitButton = ({
  text,
  className,
  ...rest
}: Button<unknown>) => (
  <button
    className={`${rest.disabled ? 'blue_btn_disabled' : 'blue_btn'} ${className}`}
    {...rest}
  >{text}</button>
);

export const SquareButton = ({
  text,
  className,
  ...rest
}: Button<unknown>) => (
  <button
    className={`${rest.disabled ? 'square_btn_disabled' : 'square_btn'} ${className}`}
    {...rest}
  >{text}</button>
);