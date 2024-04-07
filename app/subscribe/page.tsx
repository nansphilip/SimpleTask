import Header from "@components/header";
import Button from "@components/button";
import { Metadata } from 'next';
import { sessionGet } from "@lib/session";

export const metadata: Metadata = {
    title: 'Subscribe',
}

export default async function Subscribe() {

    const session = await sessionGet();

    return (
        <>
            <Header isLogged={session ? true : false} />
            <main className="flex-1 flex gap-4 flex-col justify-center items-center">
                <h2 className="font-bold text-2xl">Subscribing page</h2>
                <div className="w-[200px] flex gap-1 flex-col justify-center items-center">
                    <Button className="w-full" mode="/">Home</Button>
                    <Button className="w-full" variante="gray" mode="/prices">Return</Button>
                </div>
            </main>
        </>
    );
}
