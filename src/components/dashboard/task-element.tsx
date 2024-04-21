import FetchMethod from '@lib/fetch';
import { useState } from 'react';
import { X } from 'lucide-react';

import styles from '@styles/Dashboard.module.css';
import Button from '@components/button';

export default function TaskElement({ data, onClick, onDelete }: {
    data: { id: number, title: string, desc: string, status: string },
    onClick: (e: any) => any,
    onDelete: (id: number) => void
}) {

    const { id, title, desc, status } = data;

    const [confirmDelete, setConfirmDelete] = useState(false);



    let taskStatusColor, taskStatusText;
    if (status === 'todo') taskStatusColor = 'bg-red-300', taskStatusText = 'TO DO';
    else if (status === 'pending') taskStatusColor = 'bg-blue-300', taskStatusText = 'PENDING';
    else if (status === 'inprogress') taskStatusColor = 'bg-orange-300', taskStatusText = 'IN PROGRESS';
    else if (status === 'done') taskStatusColor = 'bg-green-300', taskStatusText = 'DONE';

    return (
        <li id={String(id)} className="flex w-full cursor-pointer flex-row items-center justify-between gap-2 rounded-md border border-gray-200 px-4 py-0.5 hover:bg-slate-50" onClick={onClick}>
            <div className="flex flex-col">
                <p className="font-medium">{title}</p>
                <p className="text-xs">{desc}</p>
            </div>
            <div className="flex gap-2">
                <p className={`${taskStatusColor} h-fit rounded px-2 pt-px text-[10px] text-gray-800`}>{taskStatusText}</p>
                <Button mode="button" className={`h-full px-[5px] ` + (confirmDelete ? "hover:bg-red-300" : "")}
                    name={confirmDelete ? "delete" : "confirm"}
                    variante={confirmDelete ? "danger" : "gray"}
                    onBlur={confirmDelete ? () => setConfirmDelete(false) : () => { }}
                    onClick={confirmDelete ? () => onDelete(id) : () => setConfirmDelete(true)}>
                    <X className={confirmDelete ? styles.positionStart + " " + styles.deleteAnimation : styles.positionStart} color="black" size={16} />
                </Button>
            </div>
        </li>
    );
};