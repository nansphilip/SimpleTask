import Link from 'next/link'
import { ReactNode } from 'react';

export default function Button({ href, variante, className, children, }:
    {
        href: string,
        variante?: string,
        className?: string,
        children: ReactNode,
    }) {

    const commonStyle = "px-4 py-2 rounded-md text-sm text-center transition-all";
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
            varianteStyle = `${commonStyle} text-black bg-white hover:bg-gray-100 border border-gray-300`;
            break;
        case 'no-style':
            varianteStyle = ``;
            break;
    }

    if (href === "no-link") {
        return (
            <div className={`${varianteStyle} ${className}`}>{children}</div>
        );
    }

    return (
        <Link href={href} className={`${varianteStyle} ${className}`}>
            {children}
        </Link>
    );
}