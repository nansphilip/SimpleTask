import FetchMethod from '@lib/fetch';
import { useState } from 'react';
import { X } from 'lucide-react';

import styles from '@styles/Dashboard.module.css';

import Input from '@components/input';
import Button from '@components/button';

export default function TaskElement({ id, title, desc, status, onUpdate, onDelete }:
    {
        id: number,
        title: string,
        desc: string,
        status: string,
        onUpdate: (task: { id: number, title: string, desc: string, status: string }) => void,
        onDelete: (id: number) => void
    }) {

    const [taskTitle, setTaskTitle] = useState(title);
    const [taskDesc, setTaskDesc] = useState(desc);
    const [taskStatus, setTaskStatus] = useState(status);
    const [confirmDelete, setConfirmDelete] = useState(false);


    /**
     * Update the task title and description
     * Check if the title is empty, if so, launch the delete function
     */
    const updateTask = async (newStatusValue?: string) => {
        if (taskTitle === "") return deleteTask();

        // If the newStatusValue is defined, update the task status
        if (newStatusValue) setTaskStatus(newStatusValue);

        const data = await FetchMethod({
            function: 'UpdateTask',
            param: {
                id: id,
                title: taskTitle,
                desc: taskDesc,
                status: newStatusValue ?? taskStatus,
            }
        });

        onUpdate(data.content);
    }

    /**
     * Show a toggle delete confirm button before deleting the task
     * @param event prevent the form from submitting
     */
    const deleteTask = async (event?: React.FormEvent<HTMLFormElement>) => {
        if (event) event.preventDefault();

        if (confirmDelete === true) {
            const data = await FetchMethod({
                function: 'DeleteTask',
                param: {
                    id: id,
                }
            });

            // console.log("Task deleted", data);
            onDelete(id);
        }

        setConfirmDelete(true);
    };

    return (
        <li className="flex w-full flex-row items-center justify-center gap-2">
            <form onSubmit={(e) => deleteTask(e)} onBlur={() => taskTitle ? setConfirmDelete(false) : null} className="flex size-full flex-row items-center justify-center gap-2">
                <Input className="w-full" type="text" name={`title-${id}`} onBlur={() => updateTask()} onChange={setTaskTitle} value={taskTitle} placeholder="Title" />
                <Input className="w-full" type="text" name={`desc-${id}`} onBlur={() => updateTask()} onChange={setTaskDesc} value={taskDesc} placeholder="Description" />
                <select className="h-full rounded-md border border-gray-100 px-4 py-1 outline-gray-500 focus:outline focus:outline-2" onChange={(e) => updateTask(e.target.value)} value={taskStatus}>
                    <option value="todo">To do</option>
                    <option value="pending">Pending</option>
                    <option value="inprogress">In progress</option>
                    <option value="done">Done</option>
                </select>
                <Button mode="submit" name={confirmDelete ? "delete" : "confirm"} className="h-full px-[10px]" variante={confirmDelete ? "danger" : "gray"}>
                    <X className={confirmDelete ? styles.positionStart + " " + styles.deleteAnimation : styles.positionStart} color="black" size={16} />
                </Button>
            </form>
        </li>
    );
};