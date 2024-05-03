'use client'

import { useEffect, useState } from "react";

export default function ScreenSize() {


    const [screenSize, setScreenSize] = useState(0);

    useEffect(() => {
        setScreenSize(window.innerWidth);

        const handleResize = () => {
            setScreenSize(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return <div className="fixed bottom-1 right-1 z-20 rounded-md border bg-white px-2">
        <span>{screenSize}p </span>
        <span className="sm:hidden">Mobile</span>
        <span className="max-sm:hidden md:hidden">SM</span>
        <span className="max-md:hidden lg:hidden">MD</span>
        <span className="max-lg:hidden xl:hidden">LG</span>
        <span className="max-xl:hidden 2xl:hidden">XL</span>
        <span className="max-2xl:hidden">2XL</span>
    </div>
}