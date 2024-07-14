import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../component/Input";
import Button from "../component/Button";

interface IFormInput {
  email: string;
  username: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  username: yup
    .string()
    .min(4, "Username must be at least 4 characters")
    .required("Username is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const RegisterForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: IFormInput) => {
    console.log(data);
  };

  return (
    <>
      <h2>Register Form</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm mx-auto mt-10"
      >
        <Input
          label="Email"
          name="email"
          type="email"
          register={register}
          errors={errors}
        />
        <Input
          label="Username"
          name="username"
          type="text"
          register={register}
          errors={errors}
        />
        <Input
          label="Password"
          name="password"
          type="password"
          register={register}
          errors={errors}
        />
        <Button type="submit">Register</Button>
      </form>
    </>
  );
};

export default RegisterForm;
