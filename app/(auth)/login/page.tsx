'use client';
import Link from "next/link";
import { ProvidersButtons } from "./ProvidersButtons";
import { SubmitButton } from "@components/FormElements/Buttons";
import { InputPassword } from "@components/FormElements/InputPassword";
import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "@components/FormElements/Input";

type LoginInputs = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const LogIn = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginInputs>();

  const onSubmit: SubmitHandler<LoginInputs> = (data) => console.log(data);

  return (
    <section className="w-full max-w-full flex-center flex-col">
      <div className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism">
        <ProvidersButtons />
        <form className=" flex flex-col gap-7"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            registration={register("username")}
            label='user name'
            type="text"
            placeholder="name"
          />
          <InputPassword label='password' registration={register("password")} />
          <SubmitButton text="LogIn" type="submit" />
          <Link href="/register">
            {"Don't have an account?   "}
            <b className="blue_gradient">Register</b>
          </Link>
        </form>
      </div>
    </section>
  );
};

export default LogIn;