'use client'

import Button from "@components/button";
import { usePathname } from 'next/navigation';
import { ScanFace, LogOut } from 'lucide-react';
import { sessionDestroy } from "@/lib";

export default function Header({ className, isLogged }: { className?: string, isLogged: boolean }) {

    const pathName = usePathname();

    return (
        <header className={`mx-4 my-2 flex flex-row justify-between items-center ${className}`}>

            <Button variante="no-style" className="text-2xl font-bold hover:text-gray-700" mode="/">Simple Task</Button>

            <nav className="flex gap-4 flex-row justify-center items-center">
                <Button className={pathName === "/" ? "font-bold" : ""}
                    variante="white" mode="/">Home</Button>
                <Button className={pathName === "/prices" ? "font-bold" : ""}
                    variante="white" mode="/prices">Prices</Button>
                <Button className={pathName === "/subscribe" ? "font-bold" : ""}
                    variante="white" mode="/subscribe">Subscribe</Button>
                <Button className={pathName === "/dashboard" ? "font-bold" : ""}
                    variante="white" mode="/dashboard">Dashboard</Button>
            </nav>

            <div className="flex gap-2 flex-row justify-end items-center">
                {isLogged ?
                    <Button className="flex gap-2 flex-row justify-center items-center" variante="gray" mode="button" onClick={() => sessionDestroy()}>
                        <span>Logout</span>
                        <LogOut color="black" size={16} />
                    </Button> :
                    <Button mode="/auth" className="flex gap-2 flex-row justify-center items-center">
                        <span>Auth</span>
                        <ScanFace color="white" size={16} />
                    </Button>
                }
            </div>

        </header>
    );
}