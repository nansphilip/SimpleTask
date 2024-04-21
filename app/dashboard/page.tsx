'use client';

import Input from '@components/input';
import Button from '@components/button';
import Card from '@components/card';
import TaskElement from '@components/dashboard/task-element';
import ViewPanel from '@components/dashboard/view-panel';
import EditionPanel from '@/components/dashboard/edition-panel';

import { PanelLeftOpen } from 'lucide-react';

import { useState, useEffect, useRef, use } from 'react';
import { sessionGet } from '@lib/session';
import FetchMethod from '@lib/fetch';

export default function Dashboard() {

    // Show or hide the edition panel
    const [editionPanelVisible, setEditionPanelVisible] = useState("hidden");
    const [viewPanelVisible, setViewPanelVisible] = useState("");

    // Add a task
    const [addTaskName, setAddTaskName] = useState('');
    const [addTaskStatus, setAddTaskStatus] = useState('todo');

    // Task list
    const [taskList, setTaskList] = useState<JSX.Element[]>([]);
    // Select a task to edit
    const [selectedTask, setSelectedTask] = useState<{ id: number, title: string, desc: string, status: string }>({ id: 0, title: '', desc: '', status: '' });

    // Edit a task
    const [editTaskId, setEditTaskId] = useState('');
    const [editTaskTitle, setEditTaskTitle] = useState('');
    const [editTaskDesc, setEditTaskDesc] = useState('');
    const [editTaskStatus, setEditTaskStatus] = useState('');

    // Filter the task list
    const [taskListFiltered, setTaskListFiltered] = useState<JSX.Element[]>([]);
    const [taskFilterTime, setTaskFilterTime] = useState('allTime');
    const [taskFilterStatus, setTaskFilterStatus] = useState('allTypes');
    const [taskFilterView, setTaskFilterView] = useState('list');

    useEffect(() => {
        if (window.innerWidth < 800) setViewPanelVisible("hidden");
    }, []);

    useEffect(() => {
        window.addEventListener('resize', () => {
            if (window.innerWidth < 1000 && editionPanelVisible === "" && viewPanelVisible === "") {
                setViewPanelVisible("hidden");
                setEditionPanelVisible("hidden");
            }
            if (window.innerWidth < 800 && (editionPanelVisible === "" || viewPanelVisible === "")) {
                setViewPanelVisible("hidden");
                setEditionPanelVisible("hidden");
            }
        });
    }, [editionPanelVisible, viewPanelVisible]);

    useEffect(() => {
        if (editionPanelVisible === "" && window.innerWidth < 1000) setViewPanelVisible("hidden");
    }, [editionPanelVisible]);

    useEffect(() => {
        if (viewPanelVisible === "" && window.innerWidth < 1000) setEditionPanelVisible("hidden");
    }, [viewPanelVisible]);



    // Delete a task
    const taskListRef = useRef(taskList);

    useEffect(() => {
        taskListRef.current = taskList;
    }, [taskList]);

    const selectATask = (e: any) => {
        if (e === null) return console.log('No event', e);

        let element = e.target;

        // if (element === null) return console.log('Null element', element);
        // if (element.nodeName === 'BUTTON' || element.nodeName === 'svg' || element.nodeName === 'path') return console.log('No element', element.nodeName);

        while (element.nodeName !== 'FORM') {
            element = element.parentNode;
            if (element === null) return console.log('Null element', element);
        }

        const taskData = taskListRef.current.filter(task => Number(task.key) === Number(element.name))[0].props.data;
        // console.log(element.nodeName);
        // console.log(taskData);

        // Get data from the selected task
        setSelectedTask(taskData);
        setEditionPanelVisible("");
    }

    useEffect(() => {
        setEditTaskId(String(selectedTask.id));
        setEditTaskTitle(selectedTask.title);
        setEditTaskDesc(selectedTask.desc ?? '');
        setEditTaskStatus(selectedTask.status);
    }, [selectedTask, setEditTaskId, setEditTaskTitle, setEditTaskDesc, setEditTaskStatus]);

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
        GetTaskList().then(taskList => {
            const fetchedList = taskList.content.map((data: { id: number, title: string, desc: string, status: string }) => {
                return <TaskElement key={data.id} data={data} onClick={(e) => (selectATask(e))} onDelete={deleteTaskFromList} />
            });

            setTaskList(fetchedList);

        }).catch(err => {
            console.error('Error:', err);
        });
    }, []);


    const addTask = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const data = await FetchMethod({
            function: 'AddTask',
            param: {
                userId: (await sessionGet()).content.user.id,
                title: addTaskName,
                status: addTaskStatus,
            }
        });

        setTaskList([
            ...taskList,
            <TaskElement key={data.content.id} data={data} onClick={(e) => (selectATask(e))} onDelete={deleteTaskFromList} />
        ]);

        setAddTaskName('');
    }

    const updateTask = async (newStatusValue?: string) => {
        // if (editTaskTitle === "") return deleteTask();

        // If the newStatusValue is defined, update the task status
        if (newStatusValue) setEditTaskStatus(newStatusValue);

        const data = await FetchMethod({
            function: 'UpdateTask',
            param: {
                id: Number(editTaskId),
                title: editTaskTitle,
                desc: editTaskDesc,
                status: newStatusValue ?? editTaskStatus,
            }
        });

        // console.log('Task id:', editTaskId);
        // console.log('Task list:', taskListRef.current);

        const updatedList = taskListRef.current.map(taskEl =>
            Number(taskEl.key) === data.content.id ?
                <TaskElement key={data.content.id} data={data.content} onClick={(e) => (selectATask(e))} onDelete={deleteTaskFromList} />
                : taskEl
        );

        // console.log('Updated list:', updatedList);

        setTaskList(updatedList);
    }


    const deleteTaskFromList = (id: number) => {
        setTaskList(taskListRef.current.filter(task => Number(task.key) !== id));
    };


    useEffect(() => {
        taskFilterStatus === 'allTypes' ?
            setTaskListFiltered(taskListRef.current) :
            setTaskListFiltered(taskListRef.current.filter(task => task.props.status === taskFilterStatus));
    }, [taskList, taskFilterStatus]);

    return <main className="flex flex-1 items-start justify-center overflow-hidden">
        <ViewPanel taskFilterTime={taskFilterTime} setTaskFilterTime={setTaskFilterTime} taskFilterStatus={taskFilterStatus} setTaskFilterStatus={setTaskFilterStatus} taskFilterView={taskFilterView} setTaskFilterView={setTaskFilterView} viewPanelVisible={viewPanelVisible} setViewPanelVisible={setViewPanelVisible} />

        <section id="task-panel" className="flex size-full flex-1 flex-col items-center justify-start gap-4 overflow-hidden px-4 pb-4">
            <Card className="flex w-full flex-col items-start justify-center gap-2">
                <h2 className="text-xl font-bold">Add a task</h2>
                <form onSubmit={(e) => addTask(e)} className="flex w-full flex-row items-center justify-center gap-2">
                    <Input className="w-full" type="text" name="addTaskTitle" onChange={setAddTaskName} value={addTaskName} placeholder="Add task" required />
                    <select name="addTaskStatus" id="addTaskStatus" className="h-full rounded-md border border-gray-100 px-4 py-1 outline-gray-500 focus:outline focus:outline-2" onChange={(e) => setAddTaskStatus(e.target.value)}>
                        <option value="todo">To do</option>
                        <option value="pending">Pending</option>
                        <option value="inprogress">In progress</option>
                        <option value="done">Done</option>
                    </select>
                    <Button mode="submit" className="h-full">Add</Button>
                </form>
            </Card>
            <Card className="flex w-full flex-1 flex-col items-start justify-center gap-2 overflow-hidden">
                <div className="flex gap-2">
                    <h2 className="text-xl font-bold">My task list</h2>
                    <Button className={`flex items-center justify-center gap-2 px-1.5 py-0` + (viewPanelVisible === "" ? " hidden" : "")} mode="button" variante="border" onClick={() => setViewPanelVisible("")}><PanelLeftOpen color="black" size={16} /><span>Filters</span></Button>
                </div>
                <ul className="flex w-full flex-1 flex-col items-center justify-start gap-1 overflow-y-auto overflow-x-hidden pr-1">
                    {taskListFiltered.length ? taskListFiltered : <li className="text-gray-400">No task found...</li>}
                </ul>
            </Card>
        </section>

        <EditionPanel selectedTask={selectedTask} editionPanelVisible={editionPanelVisible} setEditionPanelVisible={setEditionPanelVisible} editTaskId={editTaskId} editTaskTitle={editTaskTitle} setEditTaskTitle={setEditTaskTitle} editTaskDesc={editTaskDesc} setEditTaskDesc={setEditTaskDesc} editTaskStatus={editTaskStatus} setEditTaskStatus={setEditTaskStatus} onUpdate={updateTask} />
    </main>
}