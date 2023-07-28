'use client';

import { ReactNode } from "react";

type ContainerProps = {
    children: ReactNode
}

export const Container: React.FC<ContainerProps> = ({ children }) => {
    return (
        <main className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4 transition-all">
            {children}
        </main>
    )
}