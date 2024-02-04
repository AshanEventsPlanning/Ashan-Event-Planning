"use client";

import { useId } from "react";
import { useFormContext } from "react-hook-form";

interface TextInputProps {
  label: string;
  name: string;
  disabled?: boolean;
}

function TextInput({ label, name: inputKey, disabled }: TextInputProps) {
  const { register, formState } = useFormContext();

  const id = useId();
  const { errors } = formState;
  const fieldError = errors[inputKey];

  return (
    <div>
      <label htmlFor={id} className="block text-base font-medium py-2">
        {label}
      </label>
      {inputKey !== "message" && (
        <input
          {...register(inputKey, { required: "This field is required" })}
          type="text"
          id={id}
          disabled={disabled ?? false}
          placeholder={label}
          className="border border-gray-400 rounded-md text-base py-2 px-4 w-full"
        />
      )}
      {inputKey === "message" && (
        <input
          {...register(inputKey)}
          type="text"
          id={id}
          disabled={disabled ?? false}
          placeholder={label}
          className="border border-gray-400 rounded-md text-base py-2 px-4 w-full"
        />
      )}
      <p className="text-red-500 font-medium py-2 text-sm">{fieldError?.message as string}</p>
    </div>
  );
}

export default TextInput;
