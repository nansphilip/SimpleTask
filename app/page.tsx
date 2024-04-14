import Header from "@components/header";
import Background from "@components/background";
import { sessionGet } from "@lib/session";

export default async function Home() {

    const session = await sessionGet();

    return <>
        <Header isLogged={session ? true : false} />
        <main className="flex-1 flex gap-4 flex-col justify-center items-center">
            <h1 className="font-bold text-2xl">Simple Task</h1>
            <p className="italic">Everything is about tasks. Let&apos;s keep the organization simple!</p>
        </main>
        <Background />
    </>
}
