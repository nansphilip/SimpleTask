import Header from "@/components/header";

export default function Home() {
    return (
        <>
            <Header/>
            <main className="flex-1 flex gap-4 flex-col justify-center items-center">
                <h1 className="font-bold text-2xl">Simple Task</h1>
                <p className="italic">Everything is about tasks. Let&apos;s keep the organization simple!</p>
            </main>
        </>
    );
}
