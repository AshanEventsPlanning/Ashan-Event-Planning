"use client";

import { useId } from "react";
import { useFormContext } from "react-hook-form";

interface SelectInputProps {
  label: string;
  name: string;
  placeholder: string;
  children: React.ReactNode;
}

function SelectInput({ label, name: inputKey, placeholder, children }: SelectInputProps) {
  const { register, formState } = useFormContext();

  const id = useId();
  const { errors } = formState;
  const fieldError = errors[inputKey];

  return (
    <div className="my-4">
      <label htmlFor={id} className="block">
        {label}
      </label>
      <select
        defaultValue={""}
        id={id}
        {...register(inputKey, { required: "This field is required" })}
        className="border border-gray-400 rounded-md shadow-md py-2 ps-4 pe-16 text-sm font-normal"
      >
        <option value="" disabled hidden>
          {placeholder}
        </option>
        {children}
      </select>
      <p className="text-red-500 font-medium py-2 text-sm">{fieldError?.message as string}</p>
    </div>
  );
}

export default SelectInput;
