'use client';
import Link from "next/link";
import { ProvidersButtons } from "./ProvidersButtons";
import { SubmitButton } from "@components/FormElements/Buttons";
import { InputPassword } from "@components/FormElements/InputPassword";
import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "@components/FormElements/Input";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import { Preloader } from "@components/Preloader/Preloader";
import { useState } from "react";
import { checkLoginCredentials } from "@utils/actions";
import { LoginInputs } from "next-auth";
import { schema } from "./validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSessionExecution } from "@utils/hooks";


const LogIn = () => {

  const { session, isSessionLoading } = useSessionExecution({ redirectIfSession: true });
  const [pending, setPending] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginInputs>({ resolver: yupResolver(schema) });


  const onSubmit: SubmitHandler<LoginInputs> = async (credentials) => {
    setPending(true);
    const checkResult = await checkLoginCredentials(credentials);
    if (checkResult?.message) {
      if (checkResult.type === "email") {
        setError('email', {
          type: 'required',
          message: checkResult.message,
        });
      } else if (checkResult.type === "password") {
        setError('password', {
          type: 'required',
          message: checkResult.message,
        });
      }
      setPending(false);
      return;
    }

    await signIn("credentials", {
      ...credentials,
      redirect: false
    });
  };

  if (isSessionLoading)
    return <Preloader />;

  return (
    <section className="w-full max-w-full flex-center flex-col">
      <div className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism">
        <ProvidersButtons loading={() => setPending(true)} />
        <form className=" flex flex-col gap-7"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            registration={register("email")}
            label='email'
            type="email"
            placeholder="usertest@gmail.com"
            alert={errors.email?.message}
          />
          <InputPassword
            registration={register("password")}
            label='password'
            placeholder="usertest"
            alert={errors.password?.message}
          />
          <SubmitButton text="LogIn" type="submit" />
          <Link href="/register">
            {"Don't have an account?   "}
            <b className="blue_gradient">Register</b>
          </Link>
          <Preloader isLoading={pending} />
        </form>
      </div>
    </section>
  );
};

export default LogIn;