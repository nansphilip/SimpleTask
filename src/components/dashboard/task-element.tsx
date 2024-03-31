import { useState } from 'react';
import Input from '@components/input';
import Button from '@components/button';

export default function TaskElement(value: { value: string }) {

    const [task, setTask] = useState(value.value);

    return (
        <li className="w-full flex gap-2 flex-row justify-center items-center">
            <Input className="w-full" type="text" name="addTask" onChange={setTask} value={task} />
            <Button mode="submit" className="h-full" variante="gray">Update</Button>
            <Button mode="submit" className="h-full" variante="danger">Delete</Button>
        </li>
    );
};