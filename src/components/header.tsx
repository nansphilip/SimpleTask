'use client'

import { usePathname } from 'next/navigation';
import Button from "@/components/button";

export default function Header({ className }:
    {
        className?: string,
    }) {

    const pathName = usePathname();

    return (
        <header className={`mx-4 my-2 flex flex-row justify-between items-center ${className}`}>

            <Button variante="no-style" className="text-2xl font-bold hover:text-gray-700" href="/">Simple Task</Button>

            <nav className="flex gap-4 flex-row justify-center items-center">
                <Button className={pathName === "/" ? "font-bold" : ""}
                    variante="white" href="/">Home</Button>
                <Button className={pathName === "/prices" ? "font-bold" : ""}
                    variante="white" href="/prices">Prices</Button>
                <Button className={pathName === "/subscribe" ? "font-bold" : ""}
                    variante="white" href="/subscribe">Subscribe</Button>
                <Button className={pathName === "/dashboard" ? "font-bold" : ""}
                    variante="white" href="/dashboard">Dashboard</Button>
            </nav>

            <div className="flex gap-2 flex-row justify-end items-center">
                <Button variante="border" href="./login">Sign Up</Button>
                <Button href="./login">Login</Button>
            </div>

        </header>
    );
}