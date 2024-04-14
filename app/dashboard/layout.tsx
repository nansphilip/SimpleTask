import { Metadata } from 'next';
import { sessionGet } from "@lib/session";
import { redirect } from 'next/navigation';
import Header from "@components/header";

export const metadata: Metadata = {
    title: 'Dashboard',
}

export default async function DashboardLayout({ children, }: {
    children: React.ReactNode
}) {

    const session = await sessionGet();

    if (!session) redirect("/authentification");

    return <>
        <Header isLogged={session ? true : false} />
        {children}
    </>
}