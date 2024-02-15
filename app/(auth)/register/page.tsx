'use client';
import { SubmitButton } from "@components/FormElements/Buttons";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@components/FormElements/Input";
import { PasswordInput } from "@components/FormElements/InputPassword";

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
    watch,
    formState: { errors },
  } = useForm<RegisterInputs>();

  const onSubmit: SubmitHandler<RegisterInputs> = (data) => console.log(data);

  return (
    <section className="w-full max-w-full flex-center flex-col">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <Input
          registration={register("username")}
          label='user name'
          type="text"
          placeholder="John Doe"
        />
        <Input
          registration={register("email")}
          label='email'
          type="email"
          placeholder="someemail@gmail.com"
        />
        <PasswordInput label='password' registration={register("password")} />
        <PasswordInput label='confirm password' registration={register("confirmPassword")} />
        <SubmitButton text="Register" type="submit" />
      </form>
    </section>

  );
};

export default Register;