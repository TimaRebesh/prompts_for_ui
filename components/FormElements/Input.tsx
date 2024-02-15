import { InputHTMLAttributes } from "react";
import { RegisterOptions, UseFormRegisterReturn } from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  registration?: UseFormRegisterReturn<string>;
  alert?: string;
}

export const Input = ({
  registration,
  label,
  alert,
  ...rest
}: InputProps) => {
  return (
    <label>
      <span className="font-satoshi text-base text-gray-700">
        {label}
      </span>
      <input
        {...registration}
        className={`form_input ${alert && "input_alert"}`}
        {...rest}
      />
      {alert && <p className="text-xs text-red-700 pl-2">{alert}</p>}
    </label>
  );
};
