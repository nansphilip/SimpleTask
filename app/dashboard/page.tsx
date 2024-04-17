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
    const [addTaskStatus, setAddTaskStatus] = useState('todo');
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
            const fetchedList = data.content.map((task: { id: number, title: string, desc: string, status: string }) => {
                return <TaskElement key={task.id} id={task.id} title={task.title} desc={task.desc} status={task.status} onDelete={deleteTaskFromList} />
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
                status: addTaskStatus,
            }
        });

        setTaskList([...taskList,
        <TaskElement key={data.content.id} id={data.content.id} title={data.content.title} desc={data.content.desc} status={data.content.status} onDelete={deleteTaskFromList} />
        ]);

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


    //
    const [taskFilterTime, setTaskFilterTime] = useState('today');
    const [taskFilterStatus, setTaskFilterStatus] = useState('todo');
    const [taskFilterView, setTaskFilterView] = useState('list');

    const selectFilter = (e: any) => {
        const name = e.target.name;

        if (name === "reset" || name === "today" || name === "week" || name === "month") {
            setTaskFilterTime(name)
            console.log(taskFilterTime);
        } else if (name === "completed" || name === "inprogress" || name === "todo" || name === "deleted") {
            setTaskFilterStatus(name)
            console.log(taskFilterStatus);
        } else if (name === "list" || name === "kanban" || name === "timeline" || name === "calendar") {
            setTaskFilterView(name)
            console.log(taskFilterView);
        }
    }

    return <>
        <main className="flex flex-1 items-start justify-center gap-4 p-4">
            <section id="view-panel" className="h-full">
                <Card className="flex h-full w-[200px] flex-col gap-2">
                    <h2 className="text-xl font-bold">View</h2>
                    <nav className="flex w-full flex-col gap-1">
                        <Button className="inline-block w-full text-start" name="reset" onClick={(e) => selectFilter(e)} mode="button" variante="transparent">Every tasks</Button>
                        <hr className="my-2" />
                        <Button className="inline-block w-full text-start" name="today" onClick={(e) => selectFilter(e)} mode="button" variante="transparent">Today</Button>
                        <Button className="inline-block w-full text-start" name="week" onClick={(e) => selectFilter(e)} mode="button" variante="transparent">This week</Button>
                        <Button className="inline-block w-full text-start" name="month" onClick={(e) => selectFilter(e)} mode="button" variante="transparent">This month</Button>
                        <hr className="my-2" />
                        <Button className="inline-block w-full text-start" name="completed" onClick={(e) => selectFilter(e)} mode="button" variante="transparent">Completed</Button>
                        <Button className="inline-block w-full text-start" name="inprogress" onClick={(e) => selectFilter(e)} mode="button" variante="transparent">In progress</Button>
                        <Button className="inline-block w-full text-start" name="todo" onClick={(e) => selectFilter(e)} mode="button" variante="transparent">To do</Button>
                        <Button className="inline-block w-full text-start" name="deleted" onClick={(e) => selectFilter(e)} mode="button" variante="transparent">Deleted</Button>
                        <hr className="my-2" />
                        <Button className="inline-block w-full text-start" name="list" onClick={(e) => selectFilter(e)} mode="button" variante="transparent">List</Button>
                        <Button className="inline-block w-full text-start" name="kanban" onClick={(e) => selectFilter(e)} mode="button" variante="transparent">Kanban</Button>
                        <Button className="inline-block w-full text-start" name="timeline" onClick={(e) => selectFilter(e)} mode="button" variante="transparent">Timeline</Button>
                        <Button className="inline-block w-full text-start" name="calendar" onClick={(e) => selectFilter(e)} mode="button" variante="transparent">Calendar</Button>
                    </nav>
                </Card>
            </section>
            <section id="task-panel" className="flex size-full flex-col items-center justify-start gap-4">
                <Card className="flex w-full flex-col items-start justify-center gap-2">
                    <h2 className="text-xl font-bold">Add a task</h2>
                    <form onSubmit={(e) => addTask(e)} className="flex w-full flex-row items-center justify-center gap-2">
                        <Input className="w-full" type="text" name="addTaskTitle" onChange={setAddTaskName} value={addTaskName} placeholder="Add task" required />
                        <Input className="w-full" type="text" name="addTaskDesc" onChange={setAddTaskDesc} value={addTaskDesc} placeholder="Write a description" />
                        <select className="h-full rounded-md border border-gray-100 px-4 py-1 outline-gray-500 focus:outline focus:outline-2" onChange={(e) => setAddTaskStatus(e.target.value)}>
                            <option value="todo">To do</option>
                            <option value="pending">Pending</option>
                            <option value="inprogress">In progress</option>
                            <option value="done">Done</option>
                        </select>
                        <Button mode="submit" className="h-full">Add</Button>
                    </form>
                </Card>
                <Card className="flex w-full flex-col items-start justify-center gap-2">
                    <h2 className="text-xl font-bold">My task list</h2>
                    <ul className="flex w-full flex-col items-center justify-center gap-2">
                        {taskList.length ? taskList : <li className="text-gray-400">No task found...</li>}
                    </ul>
                </Card>
            </section>
            <section id="edit-panel" className="h-full">
                <Card className="flex h-full w-[200px] flex-col gap-2">
                    <h2 className="text-xl font-bold">Edition</h2>
                    <p>Here you can edit your tasks.</p>
                </Card>
            </section>
        </main>
    </>
}
