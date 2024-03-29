// import Header from "@components/header";
import Button from "@components/button";
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Dashboard',
}

export default function Dashboard() {
    return (
        <>
            {/* <Header/> */}
            <main className="flex-1 flex gap-4 flex-col justify-center items-center">
                <h2 className="font-bold text-2xl">Dashboard page</h2>
                <div className="w-[200px] flex gap-1 flex-col justify-center items-center">
                    <Button className="w-full" mode="/">Home</Button>
                    <Button className="w-full" variante="gray" mode="/prices">Return</Button>
                </div>
            </main>
        </>
    );
}
