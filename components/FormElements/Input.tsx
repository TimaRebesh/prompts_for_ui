import { InputHTMLAttributes } from "react";
import { RegisterOptions, UseFormRegisterReturn } from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  registration?: UseFormRegisterReturn<string>;
}

export const Input = ({
  registration,
  label,
  ...rest
}: InputProps) => {
  return (
    <label>
      <span className="font-satoshi text-base text-gray-700">
        {label}
      </span>
      <input
        {...registration}
        required
        className="form_input"
        {...rest}
      />
    </label>
  );
};
