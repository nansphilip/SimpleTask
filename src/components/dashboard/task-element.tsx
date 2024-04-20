import FetchMethod from '@lib/fetch';
import { MouseEventHandler, useState } from 'react';
import { X } from 'lucide-react';

import styles from '@styles/Dashboard.module.css';

import Input from '@components/input';
import Button from '@components/button';

export default function TaskElement({ id, title, desc, status, onClick, onDelete }:
    {
        id: number,
        title: string,
        desc: string,
        status: string,
        onClick: (e: any) => any,
        onDelete: (id: number) => void
    }) {

    const [taskTitle, setTaskTitle] = useState(title);
    const [taskDesc, setTaskDesc] = useState(desc);
    const [taskStatus, setTaskStatus] = useState(status);
    const [confirmDelete, setConfirmDelete] = useState(false);

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

    let taskStatusColor;
    if (taskStatus === 'todo') taskStatusColor = 'bg-red-300';
    else if (taskStatus === 'pending') taskStatusColor = 'bg-blue-300';
    else if (taskStatus === 'inprogress') taskStatusColor = 'bg-orange-300';
    else if (taskStatus === 'done') taskStatusColor = 'bg-green-300';

    return (
        <li className="flex w-full cursor-pointer flex-row items-center justify-center gap-2 rounded-md border px-4 py-0.5 hover:bg-slate-50" onClick={onClick}>
            <form name={String(id)} onSubmit={(e) => deleteTask(e)} onBlur={() => taskTitle ? setConfirmDelete(false) : null} className="flex size-full items-center justify-between">
                <div className="flex flex-col">
                    <p className="font-medium">{taskTitle}</p>
                    <p className="text-xs">{taskDesc}</p>
                </div>
                <div className="flex gap-2">
                    <p className={`${taskStatusColor} rounded px-2`}>{taskStatus}</p>
                    <Button mode="submit" name={confirmDelete ? "delete" : "confirm"} className="h-full px-[5px]" variante={confirmDelete ? "danger" : "gray"}>
                        <X className={confirmDelete ? styles.positionStart + " " + styles.deleteAnimation : styles.positionStart} color="black" size={16} />
                    </Button>
                </div>
            </form>
        </li>
    );
};