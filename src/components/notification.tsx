import { ReactNode } from "react";

export default function Notification({ className, variante, children }:
    {
        className?: string,
        variante?: string,
        children: ReactNode,
    }) {

    let classVariante = "";
    let classVarianteDot = "";

    switch (variante) {
        case "success":
            classVariante = "bg-green-300 border-green-500";
            classVarianteDot = "bg-green-500 border-green-200";
            break;

        case "info":
            classVariante = "bg-blue-300 border-blue-500";
            classVarianteDot = "bg-blue-500 border-blue-200";
            break;

        case "warning":
            classVariante = "bg-orange-300 border-orange-500";
            classVarianteDot = "bg-orange-500 border-orange-200";
            break;
        
        case "danger":
            classVariante = "bg-red-300 border-red-500";
            classVarianteDot = "bg-red-500 border-red-200";
            break;

        case undefined:
            classVariante = "bg-white border-gray-500";
            classVarianteDot = "bg-gray-500 border-gray-200";
            break;
    }

    return (
        <div className="fixed z-[-1] h-full w-full flex flex-row justify-center items-end">
            <div className={`relative bottom-[1rem] flex gap-2 flex-row justify-center items-center px-2 text-sm shadow-md rounded-md border ${classVariante} ${className}`}>
                <div className={`h-[8px] w-[8px] rounded-full border ${classVarianteDot}`}></div>
                <div>{children}</div>
            </div>
        </div>
    );
}