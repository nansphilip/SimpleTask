import FetchMethod from '@lib/fetch';
import { useState } from 'react';

import Input from '@components/input';
import Button from '@components/button';

export default function TaskElement({ id, title, desc, onDelete }:
    {
        id: number,
        title: string,
        desc: string,
        onDelete: (id: number) => void
    }) {

    const [taskTitle, setTaskTitle] = useState(title);
    const [taskDesc, setTaskDesc] = useState(desc);
    const [confirmDelete, setConfirmDelete] = useState(false);

    /**
     * Update the task title and description
     * Check if the title is empty, if so, launch the delete function
     */
    const updateTask = async () => {
        if (taskTitle === "") return deleteTask();

        const data = await FetchMethod({
            function: 'UpdateTask',
            param: {
                id: id,
                title: taskTitle,
                desc: taskDesc,
            }
        });
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
            
            onDelete(id);
        }
        
        setConfirmDelete(true);
    };

    return (
        <li className="flex w-full flex-row items-center justify-center gap-2">
            <form onSubmit={(e) => deleteTask(e)} onBlur={() => taskTitle ? setConfirmDelete(false) : null} className="flex size-full flex-row items-center justify-center gap-2">
                <Input className="w-full" type="text" name={`title-${id}`} onBlur={updateTask} onChange={setTaskTitle} value={taskTitle} placeholder="Title" />
                <Input className="w-full" type="text" name={`desc-${id}`} onBlur={updateTask} onChange={setTaskDesc} value={taskDesc} placeholder="Description" />
                {confirmDelete ?
                    <Button mode="submit" name="delete" className="h-full" variante="danger">Confirm</Button> :
                    <Button mode="submit" name="confirm" className="h-full" variante="gray">Delete</Button>}
            </form>
        </li>
    );
};