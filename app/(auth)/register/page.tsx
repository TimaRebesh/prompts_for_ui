'use client';
import { SubmitButton } from "@components/FormElements/Buttons";
import { RegisterOptions, SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@components/FormElements/Input";
import { InputPassword } from "@components/FormElements/InputPassword";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./validation";

type RegisterInputs = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterInputs>({ resolver: yupResolver(schema), });

  const onSubmit: SubmitHandler<RegisterInputs> = (data) => {
    if (data.password !== data.confirmPassword) {
      setError('confirmPassword', {
        type: 'manual',
        message: 'passwords do not match',
      });
      return;
    }
  };
  console.log(errors);

  return (
    <section className="w-full max-w-full flex-center flex-col">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <Input
          label='user name'
          registration={register("username")}
          alert={errors.username?.message}
          type="text"
          placeholder="John Doe"
        />

        <Input
          label='email'
          registration={register("email")}
          alert={errors.email?.message}
          type="email"
          placeholder="someemail@gmail.com"
        />
        <InputPassword
          label='password'
          registration={register("password")}
          alert={errors.password?.message}
        />
        <InputPassword
          label='confirm password'
          alert={errors.confirmPassword?.message}
          registration={register("confirmPassword")}
        />
        <SubmitButton
          text="Register"
          type="submit"
          disabled={Object.keys(errors).length !== 0}
        />
      </form>
    </section>

  );
};

export default Register;