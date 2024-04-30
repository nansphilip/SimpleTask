'use client'

import Header from "@components/header";
import Card from "@components/card";
import Input from "@components/input";
// import { Metadata } from 'next';
import { sessionGet } from "@lib/session";
import { useRouter } from 'next/navigation';
import { useState, useEffect, use } from "react";

// export const metadata: Metadata = {
//     title: 'Subscribe',
// }

export default function Subscribe() {

    const router = useRouter();

    // Check if user is already logged in
    async function checkSession() {
        const session = await sessionGet();
        if (!session) router.push('/authentification?redirect=subscribe');

        return session;
    }

    const [session, setSession] = useState<any>();
    const [email, setEmail] = useState('');

    useEffect(() => {
        checkSession().then(response => {
            setSession(response);
            setEmail(response.content.user.email);
        });
    });

    const [subscribe, setSubscribe] = useState(true); // monthly = true, annual = false
    const [street, setStreet] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [city, setCity] = useState('');
    const [cardName, setCardName] = useState('');
    const [cardNum, setCardNum] = useState('');
    const [expiration, setExpiration] = useState('');
    const [cvv, setCvv] = useState('');

    const SelectChildInput = (e: any) => {
        const cardEl = (e.target as HTMLElement);
        const inputEl = cardEl?.children[0] as HTMLInputElement;
        if (!inputEl.checked) {
            inputEl.checked = true;
            setSubscribe(inputEl.id === "monthly" ? true : false);
        }
    }

    return <>
        <Header isLogged={session ? true : false} />
        <main className="flex flex-1 flex-row items-center justify-center gap-8">

            <div className="flex flex-row items-center justify-center gap-8">
                <Card className="flex h-full w-[300px] flex-col items-start justify-start gap-2">
                    <h2 className="text-xl font-bold">Invoice</h2>
                    <div className="w-full">
                        <h3 className="italic">Account</h3>
                        <div className="text-right">
                            <p>{email}</p>
                        </div>
                    </div>
                    <div className="w-full">
                        <h3 className="italic">Price</h3>
                        <div className="text-right">
                            <p>{subscribe ? "5 € / month" : "50 € / year"}</p>
                        </div>
                    </div>
                    <div className="w-full">
                        <h3 className="italic">Address</h3>
                        <div className="text-right">
                            <p>{street ? street : "Address"}</p>
                            <p>{zipcode ? zipcode: "Zipcode"} {city ? city: "City"}</p>
                        </div>
                    </div>
                    <div className="w-full">
                        <h3 className="italic">Payment</h3>
                        <div className="text-right">
                            <p>{cardName ? cardName : "Card Owner"}</p>
                            <p>{cardNum ? cardNum : "**** **** **** ****"}</p>
                            <p>{expiration ? expiration : (new Date().getMonth() + " / " + new Date().getFullYear())}</p>
                            {/* <p>{cvv ? cvv : "123"}</p> */}
                        </div>
                    </div>
                </Card>
                <form action="" className="flex h-full w-[300px] flex-col items-start justify-start gap-4">
                    <div className="flex h-full w-[300px] flex-col items-start justify-start gap-2">
                        <h2 className="text-xl font-bold">Subscribing</h2>
                        <Card onClick={SelectChildInput} className="flex w-full flex-row items-center justify-start gap-2">
                            <Input className="focus:outline-none" type="radio" name="subscribe" id="monthly" defaultChecked />
                            <span>Mensuel</span>
                        </Card>
                        <Card onClick={SelectChildInput} className="flex w-full flex-row items-center justify-start gap-2">
                            <Input className="focus:outline-none" type="radio" name="subscribe" id="annual" />
                            <span>Annuel</span>
                        </Card>
                    </div>
                    <div className="flex h-full w-[300px] flex-col items-start justify-start gap-2">
                        <h2 className="text-xl font-bold">Address</h2>
                        <Card className="flex h-full w-[300px] flex-col items-start justify-start gap-2">
                            <Input className="w-full" type="text" name="address" onChange={setStreet} value={street} placeholder="Address" />
                            <Input className="w-full" type="number" name="zipcode" onChange={setZipcode} value={zipcode} placeholder="Zipcode"></Input>
                            <Input className="w-full" type="text" name="city" onChange={setCity} value={city} placeholder="City" />
                        </Card>
                    </div>
                    <div className="flex h-full w-[300px] flex-col items-start justify-start gap-2">
                        <h2 className="text-xl font-bold">Payement</h2>
                        <Card className="flex h-full w-[300px] flex-col items-start justify-start gap-2">
                            <Input className="w-full" type="text" name="name" onChange={setCardName} value={cardName} placeholder="Card Owner" />
                            <Input className="w-full" type="number" name="card" onChange={setCardNum} value={cardNum} placeholder="Number" />
                            <div className="flex items-start justify-start gap-2">
                                <Input className="w-full" type="text" name="expiration" onChange={setExpiration} value={expiration} placeholder="MM / YY" />
                                <Input className="w-full" type="number" name="cvv" onChange={setCvv} value={cvv} placeholder="CVV" />
                            </div>
                        </Card>
                    </div>
                </form>
            </div>

        </main>
    </>
}
