import Link from 'next/link'

export default function Button({ href, variante, className, children, }:
    {
        href: string,
        variante?: string,
        className?: string,
        children: string,
    }) {

    let varianteStyle = "";
    
    switch (variante) {
        default:
            varianteStyle = "text-white bg-black hover:bg-gray-800";
            break;
        case 'white':
            varianteStyle = "text-black bg-white hover:bg-gray-100";
            break;
        case 'no-style':
            varianteStyle = "px-0 py-0 text-base";
            break;
    }

    return (
        <Link href={href} className={`px-4 py-2 rounded-md text-sm ${varianteStyle} ${className}`}>
            {children}
        </Link>
    );
}