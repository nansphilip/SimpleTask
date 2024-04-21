'use client';

import Input from '@components/input';
import Button from '@components/button';
import Card from '@components/card';
import TaskElement from '@components/dashboard/task-element';
import ViewPanel from '@components/dashboard/view-panel';
import EditionPanel from '@/components/dashboard/edition-panel';

import { PanelLeftOpen } from 'lucide-react';
import { useState, useEffect, useRef, } from 'react';
import { sessionGet } from '@lib/session';
import FetchMethod from '@lib/fetch';

export default function Dashboard() {

    // [ ----- ----- ----- ----- ----- ----- ]
    // [ ------ Use States management ------ ]
    // [ ----- ----- ----- ----- ----- ----- ]

    // Stores the visibility of the edition and view panels
    const [editionPanelVisible, setEditionPanelVisible] = useState("hidden");
    const [viewPanelVisible, setViewPanelVisible] = useState("");

    // Stores values to add a task
    const [addTaskName, setAddTaskName] = useState('');
    const [addTaskStatus, setAddTaskStatus] = useState('todo');

    // Stores the selected task to edit
    const [selectedTask, setSelectedTask] = useState
        <{ id: number, title: string, desc: string, status: string }>
        ({ id: 0, title: '', desc: '', status: '' });

    // Stores values to edit a task
    const [editTaskId, setEditTaskId] = useState('');
    const [editTaskTitle, setEditTaskTitle] = useState('');
    const [editTaskDesc, setEditTaskDesc] = useState('');
    const [editTaskStatus, setEditTaskStatus] = useState('');

    // Stores the task list
    const [taskList, setTaskList] = useState<JSX.Element[]>([]);
    const [taskListFiltered, setTaskListFiltered] = useState<JSX.Element[]>([]);

    // Stores the task list filters
    const [taskFilterTime, setTaskFilterTime] = useState('allTime');
    const [taskFilterStatus, setTaskFilterStatus] = useState('allTypes');
    const [taskFilterView, setTaskFilterView] = useState('list');

    // Stores the task list into a ref
    const taskListRef = useRef(taskList);



    // [ ----- ----- ----- ----- ----- ----- ]
    // [ ------ Interface management ------- ]
    // [ ----- ----- ----- ----- ----- ----- ]

    // Closes the view an edition panel on resize for mobile
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

    // Closes the edition panel if user opens the view panel
    useEffect(() => {
        if (editionPanelVisible === "" && window.innerWidth < 1000) setViewPanelVisible("hidden");
    }, [editionPanelVisible]);

    // Closes the view panel if user opens the edition panel
    useEffect(() => {
        if (viewPanelVisible === "" && window.innerWidth < 1000) setEditionPanelVisible("hidden");
    }, [viewPanelVisible]);

    // Hides the view panel on mobile or displays view panel on desktop
    useEffect(() => {
        if (window.innerWidth < 800) setViewPanelVisible("hidden");
    }, []);



    // [ ----- ----- ----- ----- ----- ----- ]
    // [ ------ Functions management ------- ]
    // [ ----- ----- ----- ----- ----- ----- ]

    /**
     * Selects a task from the task list to edit it in the edition panel
     * @param e Event from the task element
     * @returns void
     */
    const selectATaskForEdition = (e: any) => {
        // Prevents the function to trigger if the event is null
        if (e === null) return console.log('No event', e);
        
        // Gets the target element from the event
        let element = e.target;

        // Prevents the delete button to trigger the edition panel
        if (element === null) return console.log('Null element', element);
        if (element.nodeName === 'BUTTON' || element.nodeName === 'svg' || element.nodeName === 'path') return;

        // Gets the parent element until it reaches the task element
        while (element.nodeName !== 'LI') {
            element = element.parentNode;
            if (element === null) return console.log('Null element', element);
        }

        // Gets data from the selected task, then sets it into the useState
        setSelectedTask(taskListRef.current.filter(task => Number(task.key) === Number(element.id))[0].props.data);

        // Displays the edition panel
        setEditionPanelVisible("");
    }

    /**
     * Adds a task to the task list
     * @param event Form event to prevent default behavior
     * @returns void
     */
    const addTask = async (event: React.FormEvent<HTMLFormElement>) => {
        // Prevents the form to reload the page
        event.preventDefault();

        // Sends the add task request to the server
        const data = await FetchMethod({
            function: 'AddTask',
            param: {
                userId: (await sessionGet()).content.user.id,
                title: addTaskName,
                status: addTaskStatus,
            }
        });

        // Adds the task to the task list
        setTaskList([
            ...taskList,
            <TaskElement key={data.content.id} data={data.content} onClick={(e) => (selectATaskForEdition(e))} onDelete={deleteTask} />
        ]);

        // Resets the add task form
        setAddTaskName('');
    }

    /**
     * Updates a task from the task list
     * @param newStatusValue Status needs a specific method to be updated
     * @returns void
     */
    const updateTask = async (newStatusValue?: string) => {
        // If the newStatusValue is defined, updates the task status
        if (newStatusValue) setEditTaskStatus(newStatusValue);

        // Sends the update request to the server
        const data = await FetchMethod({
            function: 'UpdateTask',
            param: {
                id: Number(editTaskId),
                title: editTaskTitle,
                desc: editTaskDesc,
                status: newStatusValue ?? editTaskStatus,
            }
        });

        // Maps a ref array to create the updated task list
        const updatedList = taskListRef.current.map(
            taskEl => Number(taskEl.key) === data.content.id ?
                <TaskElement key={data.content.id} data={data.content} onClick={(e) => (selectATaskForEdition(e))} onDelete={deleteTask} />
                : taskEl);

        // Sets the updated task list into the useState
        setTaskList(updatedList);
    }

    /**
     * Deletes a task from the task list
     * @param id Task id to delete
     * @returns void
     */
    const deleteTask = async (id: number) => {
        // Sends the delete request to the server
        const data = await FetchMethod({
            function: 'DeleteTask',
            param: {
                id: id,
            }
        });

        // Deletes the task from the task list
        setTaskList(taskListRef.current.filter(task => Number(task.key) !== data.content.id));
    };

    /**
     * Gets all tasks from the server, then sets, filters, and displays them on the page
     * @returns void
     */
    useEffect(() => {
        // Fetches the task list from the server
        async function GetTaskList() {
            return await FetchMethod({
                function: 'GetAllTask',
                param: (await sessionGet()).content.user.id,
            });
        }

        // Displays the task list on the page, and stores it into an useState
        GetTaskList().then(taskList => {
            const fetchedList = taskList.content.map((data: { id: number, title: string, desc: string, status: string }) => {
                return <TaskElement key={data.id} data={data} onClick={(e) => (selectATaskForEdition(e))} onDelete={deleteTask} />
            });

            // Sets the task list into the useState
            setTaskList(fetchedList);
        }).catch(err => {
            console.error('Error:', err);
        });
    }, []);



    // [ ----- ----- ----- ----- ----- ----- ]
    // [ ------ Use Effects Management ----- ]
    // [ ----- ----- ----- ----- ----- ----- ]

    // Stores the task list into a ref
    useEffect(() => {
        taskListRef.current = taskList;
    }, [taskList]);

    // Sets values into edition panel fields
    useEffect(() => {
        setEditTaskId(String(selectedTask.id));
        setEditTaskTitle(selectedTask.title);
        setEditTaskDesc(selectedTask.desc ?? '');
        setEditTaskStatus(selectedTask.status);
    }, [selectedTask, setEditTaskId, setEditTaskTitle, setEditTaskDesc, setEditTaskStatus]);

    // Filters the task list using the time, status, and view filters
    useEffect(() => {
        taskFilterStatus === 'allTypes' ?
            setTaskListFiltered(taskListRef.current) :
            setTaskListFiltered(taskListRef.current.filter(task => task.props.data.status === taskFilterStatus));
    }, [taskList, taskFilterStatus]);



    // [ ----- ----- ----- ----- ----- ----- ]
    // [ ---------- Returns Page ----------- ]
    // [ ----- ----- ----- ----- ----- ----- ]

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