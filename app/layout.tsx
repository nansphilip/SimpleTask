'use client'

import { Inter } from "next/font/google";
import "@styles/globals.css";
import React, { createContext, useState } from 'react';

import Notification from "@components/notification";
import { NotificationVariante } from "@lib/types";

const inter = Inter({ subsets: ["latin"] });

interface Notification {
    variante: NotificationVariante,
    text: string
};

export const NotificationContext = createContext({} as React.Dispatch<React.SetStateAction<Notification | null>>);

export default function RootLayout({ children, }:
    Readonly<{ children: React.ReactNode; }>) {

    const [notification, setNotification] = useState<Notification | null>(null);

    return <NotificationContext.Provider value={setNotification}>
        <html lang="fr" className="h-full">
            <head>
                <title>Simple Task</title>
                <meta name="description" content="Everything is about tasks. Let's keep the organization simple!" />
            </head>
            <body className={`flex h-full flex-col ${inter.className}`}>
                {children}
                {notification ? <Notification variante={notification.variante}>{notification.text}</Notification> : null}
            </body>
        </html>
    </NotificationContext.Provider>
}
