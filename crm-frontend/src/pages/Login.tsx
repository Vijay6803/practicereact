import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import Input from "../component/Input";
import Button from "../component/Button";

interface IFormInput {
  emailOrUsername: string;
  password: string;
}

const schema = yup.object().shape({
  emailOrUsername: yup.string().required("Email or Username is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const LoginForm: React.FC = () => {
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-sm mx-auto mt-10"
    >
      <Input
        label="Email or Username"
        name="emailOrUsername"
        type="text"
        register={register}
        errors={errors.emailOrUsername}
      />
      <Input
        label="Password"
        name="password"
        type="password"
        register={register}
        errors={errors.password}
      />
      <Button type="submit">Login</Button>
      <p className="mt-4">
        Don't have an account?{" "}
        <Link to="/register" className="text-blue-500">
          Register
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
