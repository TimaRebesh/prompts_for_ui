'use client';
import { SubmitButton } from "@components/FormElements/Buttons";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@components/FormElements/Input";
import { InputPassword } from "@components/FormElements/InputPassword";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./validation";
import Link from "next/link";
import { useState } from "react";
import { redirect } from "next/navigation";
import { User } from "next-auth";
import { Checkbox } from "@components/FormElements/CheckBox";
import { Preloader } from "@components/Preloader/Preloader";
import { signIn } from "next-auth/react";
import { useSessionExecution } from "@utils/hooks";

type RegisterInputs = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  admin: boolean;
};

const Register = () => {

  const { session, isSessionLoading } = useSessionExecution({ redirectIfSession: true });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterInputs>({ resolver: yupResolver(schema) });

  const [submitting, setIsSubmitting] = useState(false);

  const registerNewUser = async ({
    username, email, password, admin
  }: RegisterInputs) => {
    setIsSubmitting(true);
    const newUser: Omit<User, 'id'> = {
      username,
      email,
      password,
      isAdmin: admin
    };
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        await signIn("credentials", {
          email,
          password,
          redirect: false
        });
      } else {
        const info = await response.json();
        if (info.type === 'username') {
          setError('username', {
            type: 'required',
            message: info.message,
          });
        } else if (info.type === 'email') {
          setError('email', {
            type: 'required',
            message: info.message,
          });
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSubmit: SubmitHandler<RegisterInputs> = (data) => {
    if (data.password !== data.confirmPassword) {
      setError('confirmPassword', {
        type: 'required',
        message: 'passwords do not match',
      });
      return;
    }
    registerNewUser(data);
  };

  if (isSessionLoading)
    return <Preloader />;

  return (
    <section className="w-full max-w-full flex-center flex-col">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <Input
          label='user name'
          registration={register("username")}
          type="text"
          placeholder="John Doe"
          alert={errors.username?.message}
        />
        <Input
          label='email'
          registration={register("email")}
          type="email"
          placeholder="someemail@gmail.com"
          alert={errors.email?.message}
        />
        <InputPassword
          label='password'
          registration={register("password")}
          alert={errors.password?.message}
        />
        <InputPassword
          label='confirm password'
          registration={register("confirmPassword")}
          alert={errors.confirmPassword?.message}
        />
        <Checkbox
          label='Do you want to be an administrator?'
          registration={register("admin")}
          alert={errors.admin?.message}
        />
        <SubmitButton
          text="Register"
          type="submit"
          disabled={Object.keys(errors).length !== 0}
        />
        <Link href="/login">
          {"Have an account?   "}
          <b className="blue_gradient">LogIn</b>
        </Link>
      </form>
      <Preloader isLoading={submitting} />
    </section>

  );
};

export default Register;