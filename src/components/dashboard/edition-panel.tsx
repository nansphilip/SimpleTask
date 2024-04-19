import Card from "@components/card";

export default function EditionPanel() {
    return <section id="edit-panel" className="h-full">
        <Card className="flex h-full w-[200px] flex-col gap-2">
            <h2 className="text-xl font-bold">Edition</h2>
            <p>Here you can edit your tasks.</p>
        </Card>
    </section>

}