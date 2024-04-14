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
        <main className="flex-1 flex gap-8 flex-row justify-center items-center">

            <div className="flex gap-8 flex-row justify-center items-center">
                <Card className="h-full w-[300px] flex gap-2 flex-col justify-start items-start">
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
                <form action="" className="h-full w-[300px] flex gap-2 flex-col justify-start items-start">
                    <h2 className="text-xl font-bold">Subscribing</h2>
                    <Card className="w-full flex gap-2 flex-row justify-start items-center">
                        <Input className="focus:outline-none" type="radio" name="subscribe" id="monthly" />
                        <span>Mensuel</span>
                    </Card>
                    <Card className="w-full flex gap-2 flex-row justify-start items-center">
                        <Input className="focus:outline-none" type="radio" name="subscribe" id="annual" />
                        <span>Annuel</span>
                    </Card>
                </form>
            </div>

        </main>
    </>
}
