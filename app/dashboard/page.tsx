'use client';

import { ReactElement, useState } from 'react';
import Input from '@components/input';
import Button from '@components/button';
import Card from '@components/card';
import TaskElement from '@components/dashboard/task-element';

export default function Dashboard() {

    const [addTask, setAddTask] = useState('');

    const taskList = ['Task 1', 'Task 2', 'Task 3'];
    const name = ['task1', 'task2', 'task3'];

    return (
        <>
            <main className="flex-1 flex gap-4 flex-col justify-start items-center p-4">
                <Card className="w-full flex gap-2 flex-col justify-center items-start">
                    <h2 className="font-bold text-xl">Add a task</h2>
                    <div className="w-full flex gap-2 flex-row justify-center items-center">
                        <Input className="w-full" type="text" name="addTask" onChange={setAddTask} value={addTask} placeholder="Add task" />
                        <Button mode="submit" className="h-full">Add</Button>
                    </div>
                </Card>
                <Card className="w-full flex gap-2 flex-col justify-center items-start">
                    <h2 className="font-bold text-xl">My task list</h2>
                    <ul className="w-full flex gap-2 flex-col justify-center items-center">
                        <TaskElement name={name[0]} value={taskList[0]} />
                        <TaskElement name={name[1]} value={taskList[1]} />
                        <TaskElement name={name[2]} value={taskList[2]} />
                    </ul>
                </Card>
            </main>
        </>
    );
}
