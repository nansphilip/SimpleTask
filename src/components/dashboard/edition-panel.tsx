import Card from "@components/card";
import Button from "@components/button";
import Input from "@components/input";

import { useContext } from "react";
import { DashboardContext } from "@app/dashboard/page";

export default function EditionPanel({ className }: { className?: string }) {

    const {
        mobileMode,
        editionPanelVisible,
        setEditionPanelVisible,
        editTaskId,
        editTaskTitle,
        setEditTaskTitle,
        editTaskDesc,
        setEditTaskDesc,
        editTaskStatus,
        editTaskStartDate,
        setEditTaskStartDate,
        editTaskEndDate,
        setEditTaskEndDate,
        updateTask,
    } = useContext(DashboardContext);

    return <section id="edition-panel" className={`flex items-center justify-center ${className} ${editionPanelVisible}`}>
        <Button className={mobileMode ? "flex h-full w-8 items-center justify-center" : ""} mode="button" variante="no-style" onClick={() => setEditionPanelVisible("hidden")}>
            <div className={mobileMode ? "h-8 w-1.5 rounded-lg bg-slate-500" : "h-8 w-1.5 rounded-lg  bg-slate-500 transition-all hover:h-12 hover:bg-slate-700"}></div>
        </Button>
        <Card className="flex h-full w-[300px] flex-col gap-2">
            <h2 className="text-xl font-bold">Edition</h2>
            {editTaskId ?
                <form className="flex size-full flex-col items-start justify-start gap-2">
                    <label htmlFor={`editStartDate-${editTaskId}`}>Task</label>
                    <Input className="mb-4 w-full" type="text" name={`editTitle-${editTaskId}`} onBlur={() => updateTask()} onChange={setEditTaskTitle} value={editTaskTitle} placeholder="Title" />
                    <label htmlFor={`editStartDate-${editTaskId}`}>Description</label>
                    <Input className="mb-4 w-full" type="text" name={`editDesc-${editTaskId}`} onBlur={() => updateTask()} onChange={setEditTaskDesc} value={editTaskDesc} placeholder="Description" />
                    <label htmlFor={`editStatus-${editTaskId}`}>Status</label>
                    <select name={`editStatus-${editTaskId}`} id={`editStatus-${editTaskId}`} className="mb-4 w-full cursor-pointer rounded-md border border-gray-100 px-4 py-1 outline-gray-500 focus:outline focus:outline-2" onChange={(e) => updateTask(e.target.value)} value={editTaskStatus}>
                        <option value="todo">To do</option>
                        <option value="pending">Pending</option>
                        <option value="inprogress">In progress</option>
                        <option value="done">Done</option>
                    </select>
                    <label htmlFor={`editStartDate-${editTaskId}`}>Start date</label>
                    <Input className="mb-4 w-full" type="date" name={`editStartDate-${editTaskId}`} onBlur={() => updateTask()} onChange={setEditTaskStartDate} value={editTaskStartDate} />
                    <label htmlFor={`editEndDate-${editTaskId}`}>End date</label>
                    <Input className="mb-4 w-full" type="date" name={`editEndDate-${editTaskId}`} onBlur={() => updateTask()} onChange={setEditTaskEndDate} value={editTaskEndDate} />
                </form>
                : <p>Select a task to edit it.</p>}
        </Card>
    </section>

}