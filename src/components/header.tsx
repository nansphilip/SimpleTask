import Button from "@/components/button";

export default function Header({ className }:
    {
        className?: string,
    }) {

    return (
        <header className={`m-2 flex flex-row justify-between items-center ${className}`}>

            <Button variante="no-style" className="text-2xl font-bold hover:text-gray-700" href="./">Simple Task</Button>

            <nav className="flex gap-4 flex-row justify-center items-center">
                <Button variante="white" href="./">Home</Button>
                <Button variante="white" href="./prices">Prices</Button>
                <Button variante="white" href="./dashboard">Dashboard</Button>
            </nav>

            <Button href="./login">Login</Button>

        </header>
    );
}