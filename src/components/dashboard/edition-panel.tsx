import Card from "@components/card";
import Button from "@components/button";

import { useState } from "react";

export default function EditionPanel({ taskList, setTaskList }: {
    taskList: JSX.Element[],
    setTaskList: React.Dispatch<React.SetStateAction<JSX.Element[]>>
}) {
    const [editionPanelVisibility, setEditionPanelVisibility] = useState(false);
    let showPanel = editionPanelVisibility ? "hidden" : "";

    return <section id="edit-panel" className="flex h-full items-center justify-center gap-2">
        <Button className="h-8 w-1.5 rounded-lg bg-slate-500 transition-all hover:h-12 hover:bg-slate-700" mode="button" variante="no-style" onClick={() => setEditionPanelVisibility(editionPanelVisibility ? false : true)} />
        <Card className={`flex h-full w-[300px] flex-col gap-2 ${showPanel}`}>
            <h2 className="text-xl font-bold">Edition</h2>
            <p>Here you can edit your tasks.</p>
        </Card>
    </section>

}