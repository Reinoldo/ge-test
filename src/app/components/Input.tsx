"use client";

import { UseFormRegister, FieldValues } from "react-hook-form";
import { BiDollar } from "react-icons/bi";
interface InputProps {
    id: string;
    type?: string;
    disabled?: boolean;
    formatPrice?: boolean;
    required?: boolean;
    register: UseFormRegister<FieldValues>;
}

export const Input: React.FC<InputProps> = ({ id, type = "text", disabled, register, required }) => {
    return (
        <div className='relative'>
            <input
                className={`
        peer w-full rounded-l-md border-2
        bg-white p-2 px-4 font-semibold
        outline-none transition disabled:cursor-not-allowed
        disabled:opacity-70                
      `}
                id={id}
                disabled={disabled}
                type={type}
                {...register(id, { required })}
                placeholder='Digite um estado brasileiro'
            />
        </div>
    );
};
