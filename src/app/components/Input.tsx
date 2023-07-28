"use client";

import { UseFormRegister, FieldValues } from "react-hook-form";
interface InputProps {
  id: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  errors: FieldValues;
}

export const Input: React.FC<InputProps> = ({
  id,
  type = "text",
  disabled,
  register,
  required,
  onKeyDown,
  errors,
}) => {
  return (
    <div className="relative">
      <input
        className={`peer w-full rounded-l-md border-2
        bg-white p-2 px-4 font-normal
        outline-none transition disabled:cursor-not-allowed
        disabled:opacity-70 ${
          errors[id] ? "border-rose-500" : "border-neutral-300"
        }`}
        id={id}
        disabled={disabled}
        type={type}
        {...register(id, { required })}
        placeholder="Digite um estado brasileiro"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onKeyDown(e);
          }
        }}
      />
    </div>
  );
};
