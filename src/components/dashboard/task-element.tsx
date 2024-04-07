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
    
    return (
        <li className="w-full flex gap-2 flex-row justify-center items-center">
            <form className="w-full h-full flex gap-2 flex-row justify-center items-center" action="">
                <Input className="w-full" type="text" name={`title-${id}`} onBlur={() => { console.log("Update title") }} onChange={setTaskTitle} value={taskTitle} />
                <Input className="w-full" type="text" name={`desc-${id}`} onBlur={() => { console.log("Update description") }} onChange={setTaskDesc} value={taskDesc} />
                
                <Button mode="submit" className="h-full" variante="gray">Update</Button>
                <Button mode="submit" className="h-full" variante="danger">Delete</Button>
            </form>
        </li>
    );
};