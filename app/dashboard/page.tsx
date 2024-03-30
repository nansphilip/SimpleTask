import Header from "@components/header";
import Button from "@components/button";
import { redirect } from 'next/navigation';
import { Metadata } from 'next';
import { sessionGet } from "@/lib";

export const metadata: Metadata = {
    title: 'Dashboard',
}

export default async function Dashboard() {

    const session = await sessionGet();

    if (!session) {
        redirect("/auth");
    }
    
    const user = session.content.user;

    return (
        <>
            <Header isLogged={session ? true : false} />
            <main className="flex-1 flex gap-4 flex-col justify-center items-center">
                <h2 className="font-bold text-2xl">Dashboard page</h2>
                <div className="w-[200px] flex gap-1 flex-col justify-center items-start">
                    <p>{user.id}</p>
                    <p>{user.name}</p>
                    <p>{user.email}</p>
                    <p>{user.isPremium ? 'Premium' : 'Free'}</p>
                </div>
                <div className="w-[200px] flex gap-1 flex-col justify-center items-center">
                    <Button className="w-full" mode="/">Home</Button>
                    <Button className="w-full" variante="gray" mode="/prices">Return</Button>
                </div>
            </main>
        </>
    );
}
