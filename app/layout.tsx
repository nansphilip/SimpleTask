import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Simple Task",
    description: "Everything is about tasks. Let's keep the organization simple!",
};

export default function RootLayout({ children, }:
    Readonly<{ children: React.ReactNode; }>) {

    return (
        <html lang="fr" className="h-full">
            <body className={`h-full flex flex-col {inter.className}`}>{children}</body>
        </html>
    );
}
