'use client';

import { useState, useEffect } from 'react';
import Input from '@components/input';
import Button from '@components/button';
import Card from '@components/card';
import { sessionGet } from '@lib/session';
import TaskElement from '@components/dashboard/task-element';
import FetchMethod from '@lib/fetch';

export default function Dashboard() {

    const [addTask, setAddTask] = useState('');
    const [taskList, setTaskList] = useState([]);

    // Get the task list from the server
    async function getTaskList() {

        const data = await FetchMethod('/api/task/getTaskList', { 
            id: (await sessionGet()).content.user.id
        });
        return data.content.taskList;
    }

    useEffect(() => {
        getTaskList().then(data => {
            const hello = data.map((task: { id: string, title: string, desc: string }) => {
                return <TaskElement key={task.id} id={task.id} title={task.title} desc={task.desc} />
            });

            // console.log(hello);
            setTaskList(hello);

        }).catch(err => {
            console.error('Error:', err);
        });
    }, []);


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
                        {taskList}
                    </ul>
                </Card>
            </main>
        </>
    );
}
