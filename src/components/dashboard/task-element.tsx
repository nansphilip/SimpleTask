import FetchMethod from '@lib/fetch';
import { useState } from 'react';
import { X } from 'lucide-react';

import styles from '@styles/Dashboard.module.css';
import Button from '@components/button';

export default function TaskElement({ data, onClick, onDelete }:
    {
        data: { id: number, title: string, desc: string, status: string },
        onClick: (e: any) => any,
        onDelete: (id: number) => void
    }) {

    const { id, title, desc, status } = data;

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

    let taskStatusColor, taskStatusText;
    if (status === 'todo') taskStatusColor = 'bg-red-300', taskStatusText = 'TO DO';
    else if (status === 'pending') taskStatusColor = 'bg-blue-300', taskStatusText = 'PENDING';
    else if (status === 'inprogress') taskStatusColor = 'bg-orange-300', taskStatusText = 'IN PROGRESS';
    else if (status === 'done') taskStatusColor = 'bg-green-300', taskStatusText = 'DONE';

    return (
        <li className="flex w-full cursor-pointer flex-row items-center justify-center gap-2 rounded-md border border-gray-200 px-4 py-0.5 hover:bg-slate-50" onClick={onClick}>
            <form name={String(id)} onSubmit={(e) => deleteTask(e)} onBlur={() => title ? setConfirmDelete(false) : null} className="flex size-full items-center justify-between">
                <div className="flex flex-col">
                    <p className="font-medium">{title}</p>
                    <p className="text-xs">{desc}</p>
                </div>
                <div className="flex gap-2">
                    <p className={`${taskStatusColor} h-fit rounded px-2 pt-px text-[10px] text-gray-800`}>{taskStatusText}</p>
                    <Button mode="submit" name={confirmDelete ? "delete" : "confirm"} className={`h-full px-[5px] ` + (confirmDelete ? "hover:bg-red-500" : "hover:bg-red-300")} variante={confirmDelete ? "danger" : "gray"}>
                        <X className={confirmDelete ? styles.positionStart + " " + styles.deleteAnimation : styles.positionStart} color="black" size={16} />
                    </Button>
                </div>
            </form>
        </li>
    );
};