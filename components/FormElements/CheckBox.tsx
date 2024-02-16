import { InputHTMLAttributes } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  registration?: UseFormRegisterReturn<string>;
  alert?: string;
}

export const Checkbox = ({
  registration,
  label,
  alert,
  ...rest
}: CheckboxProps) => {
  return (
    <label>
      <span className="font-satoshi text-base text-gray-700">
        {label}
      </span>
      <input
        type="checkbox"
        {...registration}
        className={`form_checkbox ${alert && "input_alert"}`}
        {...rest}
      />
      {alert && <p className="text-xs text-red-700 pl-2">{alert}</p>}
    </label>
  );
};
