import { ReactNode } from "react";

export default function Card({ className, children }:
    {
        className?: string,
        children: ReactNode,
    }) {

    return (
        <div className={`p-4 shadow-md bg-white border border-gray-300 rounded-xl ${className}`}>
            {children}
        </div>
    );
}