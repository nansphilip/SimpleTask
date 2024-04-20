import Header from "@components/header";
import { sessionGet } from "@lib/session";

export default async function Home() {

    const session = await sessionGet();

    return <>
        <Header isLogged={session ? true : false} />
        <main className="flex flex-1 flex-col items-center justify-center gap-4">
            <h1 className="text-2xl font-bold">Simple Task</h1>
            <p className="text-center italic">Everything is about tasks. Let&apos;s keep the organization simple!</p>
        </main>
    </>
}
