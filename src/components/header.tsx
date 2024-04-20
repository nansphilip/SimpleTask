'use client'

import Button from "@components/button";
import { ScanFace, LogOut, Menu } from 'lucide-react';
import { sessionDestroy } from "@lib/session";
import { usePathname } from 'next/navigation';

import { useState, useContext } from 'react';
import { NotificationContext } from '@app/layout';

export default function Header({ className, isLogged }: { className?: string, isLogged: boolean }) {

    const pathName = usePathname();

    const setNotification = useContext(NotificationContext);

    const logout = () => {
        sessionDestroy();

        setNotification({ text: "Logged out", variante: "info" })
        setTimeout(() => setNotification(null), 3000);
    }

    const [showMenu, setShowMenu] = useState(false);
    let toggleMenu = showMenu ? "" : "hidden";

    return (
        <header className={`mx-4 my-2 flex flex-row items-center justify-between ${className}`}>

            <Button variante="no-style" className="text-2xl font-bold hover:text-gray-700" mode="/">Simple Task</Button>

            <nav className="flex flex-row items-center justify-center gap-4 max-sm:hidden">
                <Button className={pathName === "/" ? "font-bold" : ""}
                    variante="white" mode="/">Home</Button>
                <Button className={pathName === "/prices" ? "font-bold" : ""}
                    variante="white" mode="/prices">Prices</Button>
                {isLogged ?
                    <Button className={pathName === "/dashboard" ? "font-bold" : ""}
                        variante="white" mode="/dashboard">Dashboard</Button> : null
                }
            </nav>

            <div className="flex flex-row items-center justify-end gap-2 max-sm:hidden">
                {isLogged ?
                    <Button className="flex flex-row items-center justify-center gap-2" variante="gray" mode="button" onClick={logout}>
                        <span>Logout</span>
                        <LogOut color="black" size={16} />
                    </Button> :
                    <Button mode="/authentification" className="flex flex-row items-center justify-center gap-2">
                        <span>Auth</span>
                        <ScanFace color="white" size={16} />
                    </Button>
                }
            </div>

            <div className="flex h-full flex-col items-end sm:hidden" >
                <Button className="flex size-full items-center justify-center gap-2" mode="button" variante="border" onClick={() => setShowMenu(showMenu ? false : true)}>
                    <span>Menu</span>
                    <Menu color="black" size={16} />
                </Button>
                <nav className={`${toggleMenu} fixed top-12 flex flex-col gap-1 rounded-md border bg-white p-2`}>
                    <Button className={pathName === "/" ? "font-bold" : ""}
                        variante="white" mode="/">Home</Button>
                    <Button className={pathName === "/prices" ? "font-bold" : ""}
                        variante="white" mode="/prices">Prices</Button>
                    {isLogged ?
                        <Button className={pathName === "/dashboard" ? "font-bold" : ""}
                            variante="white" mode="/dashboard">Dashboard</Button> : null
                    }
                    {isLogged ?
                        <Button className="flex flex-row items-center justify-center gap-2" variante="gray" mode="button" onClick={logout}>
                            <span>Logout</span>
                            <LogOut color="black" size={16} />
                        </Button> :
                        <Button mode="/authentification" className="flex flex-row items-center justify-center gap-2">
                            <span>Auth</span>
                            <ScanFace color="white" size={16} />
                        </Button>
                    }
                </nav>
            </div>



        </header>
    );
}