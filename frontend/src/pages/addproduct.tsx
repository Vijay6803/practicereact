import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "../component/Input";
import Button from "../component/Button";
import FileInput from "../component/fileInput";
import MultiSelect from "../component/multiselect";
import axios from "axios";
interface IFormInputs {
  name: string;
  img: FileList;
  price: number;
  quantity: number;
  category: (string | undefined)[];
}

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  img: yup
    .mixed<FileList>()
    .required("Image is required")
    .test("fileFormat", "Unsupported Format", (value) => {
      return (
        value && value[0] && ["image/jpeg", "image/png"].includes(value[0].type)
      );
    })
    .test("fileSize", "The file is too large", (value) => {
      return value && value[0] && value[0].size <= 1024 * 1024; // 1MB
    }),
  price: yup
    .number()
    .typeError("Price must be a number")
    .positive("Price must be positive")
    .required("Price is required"),
  quantity: yup
    .number()
    .typeError("Quantity must be a number")
    .positive("Quantity must be positive")
    .integer("Quantity must be an integer")
    .required("Quantity is required"),
  category: yup
    .array()
    .of(yup.string())
    .min(1, "Select at least one category")
    .required("Category is required"),
});

const AddProductForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormInputs> = async (data: IFormInputs) => {
    console.log(data);
    // Submit the form data to your API
    const fileimg = watch("img");

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("img", data.img[0]);
    // fileimg.forEach((element) => {
    //   formData;
    // });
    console.log(data.img[0].name);

    formData.append("quantity", data.quantity.toString());
    const response = await axios.post(
      "http://localhost:5000/api/products",
      JSON.stringify(data),
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(response);
  };

  return (
    <form
      id="form"
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-lg mx-auto mt-10"
    >
      <Input label="Name" name="name" register={register} errors={errors} />
      <FileInput label="Image" name="img" register={register} errors={errors} />
      <Input
        label="Price"
        name="price"
        type="number"
        register={register}
        errors={errors}
      />
      <Input
        label="Quantity"
        name="quantity"
        type="number"
        register={register}
        errors={errors}
      />
      <MultiSelect
        label="Category"
        name="category"
        options={[
          { label: "Electronics", value: "electronics" },
          { label: "Clothing", value: "clothing" },
          { label: "Books", value: "books" },
          { label: "Toys", value: "toys" },
        ]}
        register={register}
        errors={errors}
      />
      <Button type="submit">Add Product</Button>
    </form>
  );
};

export default AddProductForm;
