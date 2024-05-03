import Card from "@components/card";
import Button from "@components/button";
import Input from "@components/input";
import Loader from "@components/loader";
import { PanelLeftOpen } from 'lucide-react';

import { useEffect, useContext } from "react";
import { DashboardContext } from "@app/dashboard/page";

export default function TaskPanel({ className }: { className?: string }) {

    const {
        addTaskName,
        setAddTaskName,
        setAddTaskStatus,
        addTask,
        taskListFiltered,
        viewPanelVisible,
        setViewPanelVisible,
        loading,
        setLoading
    } = useContext(DashboardContext);

    useEffect(() => {
        taskListFiltered.length && setLoading(false);
    }, [taskListFiltered, setLoading]);

    return <section id="task-panel" className={`flex size-full flex-col items-center justify-start gap-4 overflow-hidden ${className}`}>
        <Card className="flex w-full flex-col items-start justify-center gap-2">
            <h2 className="text-xl font-bold">Add a task</h2>
            <form onSubmit={(e) => addTask(e)} className="flex w-full flex-row items-center justify-center gap-2">
                <Input className="w-full" type="text" name="addTaskTitle" onChange={setAddTaskName} value={addTaskName} placeholder="Add task" required />
                <select name="addTaskStatus" id="addTaskStatus" className="h-full cursor-pointer rounded-md border border-gray-100 px-4 py-1 outline-gray-500 focus:outline focus:outline-2" onChange={(e) => setAddTaskStatus(e.target.value)}>
                    <option value="todo">To do</option>
                    <option value="pending">Pending</option>
                    <option value="inprogress">In progress</option>
                    <option value="done">Done</option>
                </select>
                <Button mode="submit" className="h-full">Add</Button>
            </form>
        </Card>

        <Card className="flex w-full flex-1 flex-col items-start justify-center gap-2 overflow-hidden">
            <div className="flex gap-2">
                <h2 className="text-xl font-bold">My task list</h2>
                <Button className={`flex items-center justify-center gap-2 px-1.5 pt-0 pb-0 ` + (viewPanelVisible ? "hidden" : "")} mode="button" variante="border" onClick={() => setViewPanelVisible(true)}><PanelLeftOpen color="black" size={16} /><span>Filters</span></Button>
            </div>
            <ul className="flex w-full flex-1 flex-col items-center justify-start gap-1 overflow-y-auto overflow-x-hidden pr-1">
                {loading ?
                    <li className="flex items-center justify-center gap-2 text-gray-400">
                        <Loader />
                        <span>Loading...</span>
                    </li> :
                    (taskListFiltered.length ? taskListFiltered : <li className="text-gray-400">No task found...</li>)
                }
            </ul>
        </Card>
    </section>
}