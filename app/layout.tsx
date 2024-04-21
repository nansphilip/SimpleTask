'use client'

import { Inter } from "next/font/google";
import "@styles/globals.css";
import React, { createContext, useEffect, useState } from 'react';

import Notification from "@components/notification";
import { NotificationVariante } from "@lib/types";
import ScreenSize from "@components/screenSize";
import Background from "@components/background";

const inter = Inter({ subsets: ["latin"] });

interface Notification {
    variante: NotificationVariante,
    text: string
};

export const NotificationContext = createContext({} as React.Dispatch<React.SetStateAction<Notification | null>>);

export default function RootLayout({ children, }:
    Readonly<{ children: React.ReactNode; }>) {

    const [notification, setNotification] = useState<Notification | null>(null);

    // Moves the notification on center of the screen
    useEffect(() => {
        if (!notification) return;
        const element = document.querySelector('#notification') as HTMLElement;
        const elementWidth = element.offsetWidth;

        element.style.left = "calc(50% - " + Math.floor(elementWidth / 2) + "px)";
    }, [notification]);

    return <NotificationContext.Provider value={setNotification}>
        <html lang="fr" className="h-full">
            <head>
                <title>Simple Task</title>
                <meta name="description" content="Everything is about tasks. Let's keep the organization simple!" />
            </head>
            <body className={`flex h-full flex-col ${inter.className}`}>
                {children}
                <Background />
                {notification ? <Notification id="notification" variante={notification.variante}>{notification.text}</Notification> : null}
                {process.env.NODE_ENV === 'development' ? <ScreenSize /> : null}
            </body>
        </html>
    </NotificationContext.Provider>
}
