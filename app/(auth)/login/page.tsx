'use client';
import Link from "next/link";
import { ProvidersButtons } from "./ProvidersButtons";
import { SubmitButton } from "@components/FormElements/Buttons";
import { InputPassword } from "@components/FormElements/InputPassword";
import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "@components/FormElements/Input";
import { signIn, useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { Preloader } from "@components/Preloader/Preloader";
import { useState } from "react";
import { loginAction } from "@app/actions/actions";
import { LoginInputs } from "next-auth";
import { schema } from "./validation";
import { yupResolver } from "@hookform/resolvers/yup";


const LogIn = () => {

  const { data: session } = useSession();
  const router = useRouter();
  const [pending, setPending] = useState(false);

  if (session) {
    redirect('/');
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginInputs>({ resolver: yupResolver(schema) });


  const onSubmit: SubmitHandler<LoginInputs> = async (credentials) => {
    // setPending(true);
    // const response = await signIn("credentials", {
    //   email,
    //   password,
    //   redirect: false
    // });

    // setPending(false);
    // if (response?.error) {

    // }
    const answer = await loginAction(credentials);
    if (answer?.message) {
      if (answer.type === "email") {
        setError('email', {
          type: 'required',
          message: answer.message,
        });
      } else if (answer.type === "password") {
        setError('password', {
          type: 'required',
          message: answer.message,
        });
      }
    }


    // console.log(response);

  };

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