'use client';

import Input from '@components/input';
import Button from '@components/button';
import Card from '@components/card';
import TaskElement from '@components/dashboard/task-element';

import { useState, useEffect, useRef } from 'react';
import { sessionGet } from '@lib/session';
import FetchMethod from '@lib/fetch';

export default function Dashboard() {

    const [addTaskName, setAddTaskName] = useState('');
    const [addTaskDesc, setAddTaskDesc] = useState('');
    const [taskList, setTaskList] = useState<JSX.Element[]>([]);

    // On page load
    useEffect(() => {
        // Get the task list from the server
        async function GetTaskList() {
            return await FetchMethod({
                function: 'GetAllTask',
                param: (await sessionGet()).content.user.id,
            });
        }

        // Show the task list on the page
        GetTaskList().then(data => {
            const fetchedList = data.content.map((task: { id: number, title: string, desc: string }) => {
                return <TaskElement key={task.id} id={task.id} title={task.title} desc={task.desc} onDelete={deleteTaskFromList} />
            });

            setTaskList(fetchedList);

        }).catch(err => {
            console.error('Error:', err);
        });
    }, []);

    /**
     * Add task to database and view
     * @param event prevent the form from submitting
     */
    const addTask = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const data = await FetchMethod({
            function: 'AddTask',
            param: {
                userId: (await sessionGet()).content.user.id,
                title: addTaskName,
                desc: addTaskDesc,
            }
        });

        setTaskList([...taskList, <TaskElement key={data.content.id} id={data.content.id} title={data.content.title} desc={data.content.desc} onDelete={deleteTaskFromList} />]);

        setAddTaskName('');
        setAddTaskDesc('');
    }

    
    const taskListRef = useRef(taskList);

    useEffect(() => {
        taskListRef.current = taskList;
    }, [taskList]);

    const deleteTaskFromList = (id: number) => {
        setTaskList(taskListRef.current.filter(task => Number(task.key) !== id));
    };

    return (
        <>
            <main className="flex-1 flex gap-4 flex-col justify-start items-center p-4">
                <Card className="w-full flex gap-2 flex-col justify-center items-start">
                    <h2 className="font-bold text-xl">Add a task</h2>
                    <form onSubmit={(e) => addTask(e)} className="w-full flex gap-2 flex-row justify-center items-center">
                        <Input className="w-full" type="text" name="addTaskTitle" onChange={setAddTaskName} value={addTaskName} placeholder="Add task" required />
                        <Input className="w-full" type="text" name="addTaskDesc" onChange={setAddTaskDesc} value={addTaskDesc} placeholder="Write a description" />
                        <Button mode="submit" className="h-full">Add</Button>
                    </form>
                </Card>
                <Card className="w-full flex gap-2 flex-col justify-center items-start">
                    <h2 className="font-bold text-xl">My task list</h2>
                    <ul className="w-full flex gap-2 flex-col justify-center items-center">
                        {taskList.length ? taskList : <li className="text-gray-400">No task found...</li>}
                    </ul>
                </Card>
            </main>
        </>
    );
}
