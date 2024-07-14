import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "../component/Input";
import Button from "../component/Button";
import RadioGroup from "../component/RadioGroup";

interface IFormInputs {
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
  password: string;
  gender: "male" | "female";
}

const schema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Email is invalid").required("Email is required"),
  contactNumber: yup.string().required("Contact number is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  gender: yup
    .string()
    .oneOf(["male", "female"], "Select a valid gender")
    .required("Gender is required"),
});

const RegistrationForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: IFormInputs) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-lg mx-auto mt-10"
    >
      <Input
        label="First Name"
        name="firstName"
        register={register}
        errors={errors}
      />
      <Input
        label="Last Name"
        name="lastName"
        register={register}
        errors={errors}
      />
      <Input
        label="Email"
        name="email"
        type="email"
        register={register}
        errors={errors}
      />
      <Input
        label="Contact Number"
        name="contactNumber"
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
      <RadioGroup
        label="Gender"
        name="gender"
        options={[
          { label: "Male", value: "male" },
          { label: "Female", value: "female" },
        ]}
        register={register}
        errors={errors}
      />
      <Button type="submit">Register</Button>
    </form>
  );
};

export default RegistrationForm;
