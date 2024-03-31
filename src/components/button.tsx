import Link from 'next/link'
import { ReactNode } from 'react';

/**
 * 
 * @param mode can be a link: `"/pathPage"`, a button type: `"button"`, `"submit"`, `"reset"`, or a styled div: `"style"`
 * @param variante can be `"white"`, `"gray"`, `"border"`, or `"no-style"`
 * @param className can override the default style
 * @returns `<a>`, `<button>`, or `<div>`
 */
export default function Button({ mode, onClick, variante, className, children, }:
    {
        mode: string | "style" | "button" | "submit" | "reset",
        onClick?: () => any,
        variante?: string,
        className?: string,
        children: ReactNode,
    }) {

    const commonStyle = "px-4 py-1 rounded-md text-sm text-center transition-all";
    let varianteStyle = "";

    switch (variante) {
        default:
            varianteStyle = `${commonStyle} text-white bg-black hover:bg-gray-800`;
            break;
        case 'white':
            varianteStyle = `${commonStyle} text-black bg-white hover:bg-gray-100`;
            break;
        case 'gray':
            varianteStyle = `${commonStyle} text-black bg-gray-100 hover:bg-gray-200`;
            break;
        case 'border':
            varianteStyle = `${commonStyle} text-black bg-white hover:bg-gray-100 border border-gray-300 hover:border-gray-400`;
            break;
        case 'danger':
            varianteStyle = `${commonStyle} text-white bg-red-500 hover:bg-red-400`;
            break;
        case 'no-style':
            varianteStyle = ``;
            break;
    }

    if (mode === "style") {
        return (
            <div className={`${varianteStyle} ${className}`}>
                {children}
            </div>
        );
    }

    if (mode === "button" || mode === "submit" || mode === "reset") {
        return (
            <button type={mode} onClick={onClick} className={`${varianteStyle} ${className}`}>
                {children}
            </button>
        );
    }

    if (mode[0] === "/") {
        return (
            <Link href={mode} className={`${varianteStyle} ${className}`}>
                {children}
            </Link>
        );
    }
}