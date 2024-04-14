'use client'

import Header from "@components/header";
import Card from "@components/card";
import Input from "@components/input";
// import { Metadata } from 'next';
import { sessionGet } from "@lib/session";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from "react";

// export const metadata: Metadata = {
//     title: 'Subscribe',
// }

export default function Subscribe() {

    const router = useRouter();

    // Check if user is already logged in
    async function checkSession() {
        const session = await sessionGet();
        if (!session) router.push('/authentification?redirect=subscribe');

        return session ? true : false;
    }

    const [session, setSession] = useState(false);

    useEffect(() => {
        checkSession().then(response => setSession(response));
    });

    return <>
        <Header isLogged={session ? true : false} />
        <main className="flex flex-1 flex-row items-center justify-center gap-8">

            <div className="flex flex-row items-center justify-center gap-8">
                <Card className="flex h-full w-[300px] flex-col items-start justify-start gap-2">
                    <h2 className="text-xl font-bold">Invoice</h2>
                    <div className="w-full">
                        <h3 className="italic">Account</h3>
                        <div className="text-right">
                            {/* <p>{session.content.user.email}</p> */}
                        </div>
                    </div>
                    <div className="w-full">
                        <h3 className="italic">Price</h3>
                        <div className="text-right">
                            <p>5 € / month</p>
                            {/* <p>50 € / year</p> */}
                        </div>
                    </div>
                    <div className="w-full">
                        <h3 className="italic">Address</h3>
                        <div className="text-right">
                            <p>12 Bd de la République</p>
                            <p>75011 Paris</p>
                        </div>
                    </div>
                </Card>
                <form action="" className="flex h-full w-[300px] flex-col items-start justify-start gap-2">
                    <h2 className="text-xl font-bold">Subscribing</h2>
                    <Card className="flex w-full flex-row items-center justify-start gap-2">
                        <Input className="focus:outline-none" type="radio" name="subscribe" id="monthly" />
                        <span>Mensuel</span>
                    </Card>
                    <Card className="flex w-full flex-row items-center justify-start gap-2">
                        <Input className="focus:outline-none" type="radio" name="subscribe" id="annual" />
                        <span>Annuel</span>
                    </Card>
                </form>
            </div>

        </main>
    </>
}
