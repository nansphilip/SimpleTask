import { ReactNode } from "react";

export default function Card({ className, children, onClick }:
    {
        className?: string,
        children: ReactNode,
        onClick?: (e: any) => void,
    }) {

    return (
        <div className={
            `rounded-xl border border-gray-300 bg-white p-4 shadow-md ${className}`
            + (onClick ? " cursor-pointer hover:border-gray-400 hover:bg-gray-50 transition-all" : "")
        } onClick={onClick}>
            {children}
        </div>
    );
}