"use client";

import { IconType } from "react-icons";

interface ButtonProps {
    label: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    outline?: boolean;
    small?: boolean;
    icon?: IconType;
}

export const Button: React.FC<ButtonProps> = ({ icon: Icon, label, onClick, disabled, outline, small }) => {
    return (
        <button
            disabled={disabled}
            onClick={onClick}
            className={`relative w-12 border-none rounded-r-md transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-70 bg-[#5E81F4] text-white
             ${small ? " py-1 text-sm font-light" : "text-md border-2 py-3 font-semibold"}
      `}
        >
            {Icon && <Icon size={20} className='absolute left-3 top-2' />}
            {label}
        </button>
    );
};
