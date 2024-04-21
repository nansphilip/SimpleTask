import Card from "@components/card";
import Button from "@components/button";
import Input from "@components/input";

export default function EditionPanel({ selectedTask, onUpdate, editionPanelVisible, setEditionPanelVisible, editTaskId, editTaskTitle, setEditTaskTitle, editTaskDesc, setEditTaskDesc, editTaskStatus, setEditTaskStatus, }: {
    selectedTask: { id: number, title: string, desc: string, status: string },
    onUpdate: (newStatusValue?: string) => void,
    
    editionPanelVisible: string,
    setEditionPanelVisible: (visible: string) => void,

    editTaskId: string,
    editTaskTitle: string,
    setEditTaskTitle: (title: string) => void,
    editTaskDesc: string,
    setEditTaskDesc: (desc: string) => void,
    editTaskStatus: string,
    setEditTaskStatus: (status: string) => void,
}) {

    return <section id="edit-panel" className={`flex h-full items-center justify-center gap-2 pb-4 pr-4 ${editionPanelVisible}`}>
        <Button className="fixed right-[calc(316px+0.3rem)] h-8 w-1.5 rounded-lg bg-slate-500 transition-all hover:h-12 hover:bg-slate-700" mode="button" variante="no-style" onClick={() => setEditionPanelVisible("hidden")} />
        <Card className="flex h-full w-[300px] flex-col gap-2">
            <h2 className="text-xl font-bold">Edition</h2>
            {editTaskId ?
                <form className="flex size-full flex-col items-center justify-start gap-2">
                    <Input className="w-full" type="text" name={`editTitle-${editTaskId}`} onBlur={() => onUpdate()} onChange={setEditTaskTitle} value={editTaskTitle} placeholder="Title" />
                    <Input className="w-full" type="text" name={`editDesc-${editTaskId}`} onBlur={() => onUpdate()} onChange={setEditTaskDesc} value={editTaskDesc} placeholder="Description" />
                    <select name={`editStatus-${editTaskId}`} id={`editStatus-${editTaskId}`} className="w-full rounded-md border border-gray-100 px-4 py-1 outline-gray-500 focus:outline focus:outline-2" onChange={(e) => onUpdate(e.target.value)} value={editTaskStatus}>
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