import Card from "@components/card";
import Button from "@components/button";
import Input from "@components/input";

import { useEffect, useState } from "react";

export default function EditionPanel({ selectedTask }: {
    selectedTask: { id: number, title: string, desc: string, status: string },
}) {


    const [editTaskTitle, setEditTaskTitle] = useState('');
    const [editTaskDesc, setEditTaskDesc] = useState('');
    const [editTaskStatus, setEditTaskStatus] = useState('');

    useEffect(() => {
        setEditTaskTitle(selectedTask.title);
        setEditTaskDesc(selectedTask.desc);
        setEditTaskStatus(selectedTask.status);
    }, [selectedTask]);

    /**
     * Update the task title and description
     * Check if the title is empty, if so, launch the delete function
     */
    const updateTask = async (newStatusValue?: string) => {
        // if (editTaskTitle === "") return deleteTask();

        // If the newStatusValue is defined, update the task status
        // if (newStatusValue) setEditTaskStatus(newStatusValue);

        // const data = await FetchMethod({
        //     function: 'UpdateTask',
        //     param: {
        //         id: id,
        //         title: editTaskTitle,
        //         desc: editTaskDesc,
        //         status: newStatusValue ?? editTaskStatus,
        //     }
        // });

        // onUpdate(data.content);Êêê
    }

    const [editionPanelVisibility, setEditionPanelVisibility] = useState(false);
    useEffect(() => {
        if (window.innerWidth < 640) setEditionPanelVisibility(true);
    }, []);
    let showPanel = editionPanelVisibility ? "hidden" : "";

    return <section id="edit-panel" className="flex h-full items-center justify-center gap-2">
        <Button className="h-8 w-1.5 rounded-lg bg-slate-500 transition-all hover:h-12 hover:bg-slate-700" mode="button" variante="no-style" onClick={() => setEditionPanelVisibility(editionPanelVisibility ? false : true)} />
        <Card className={`flex h-full w-[300px] flex-col gap-2 ${showPanel}`}>
            <h2 className="text-xl font-bold">Edition</h2>
            {selectedTask.id !== 0 ?
                <form className="flex size-full flex-col items-center justify-start gap-2">
                    <Input className="w-full" type="text" name={`editTitle-${selectedTask.id}`} onBlur={() => updateTask()} onChange={setEditTaskTitle} value={editTaskTitle} placeholder="Title" />
                    <Input className="w-full" type="text" name={`editDesc-${selectedTask.id}`} onBlur={() => updateTask()} onChange={setEditTaskDesc} value={editTaskDesc} placeholder="Description" />
                    <select name={`editStatus-${selectedTask.id}`} id={`editStatus-${selectedTask.id}`} className="w-full rounded-md border border-gray-100 px-4 py-1 outline-gray-500 focus:outline focus:outline-2" onChange={(e) => updateTask(e.target.value)} value={editTaskStatus}>
                        <option value="todo">To do</option>
                        <option value="pending">Pending</option>
                        <option value="inprogress">In progress</option>
                        <option value="done">Done</option>
                    </select>
                </form>
                : <p>Select a task to edit it.</p>}
        </Card>
    </section>

}