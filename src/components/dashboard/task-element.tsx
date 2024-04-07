import { useState } from 'react';
import Input from '@components/input';
import Button from '@components/button';

export default function TaskElement({ id, title, desc }:
    {
        id: string,
        title: string,
        desc: string,
    }) {

    const [taskTitle, setTaskTitle] = useState(title);
    const [taskDesc, setTaskDesc] = useState(desc);

    const deleteTask = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('Delete task:', id);
    };
    
    return (
        <li className="w-full flex gap-2 flex-row justify-center items-center">
            <form onSubmit={deleteTask} className="w-full h-full flex gap-2 flex-row justify-center items-center">
                <Input className="w-full" type="text" name={`title-${id}`} onBlur={() => { console.log("Update title") }} onChange={setTaskTitle} value={taskTitle} />
                <Input className="w-full" type="text" name={`desc-${id}`} onBlur={() => { console.log("Update description") }} onChange={setTaskDesc} value={taskDesc} />
                <Button mode="submit" className="h-full" variante="danger">Delete</Button>
            </form>
        </li>
    );
};