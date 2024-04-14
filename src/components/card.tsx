import { ReactNode } from "react";

export default function Card({ className, children }:
    {
        className?: string,
        children: ReactNode,
    }) {

    return (
        <div className={`rounded-xl border border-gray-300 bg-white p-4 shadow-md ${className}`}>
            {children}
        </div>
    );
}