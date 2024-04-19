'use client';

import Button from "@components/button";
import Card from "@components/card";
import SelectCircle from "@components/dashboard/select-circle";

import { useState } from "react";

export default function ViewPanel({
    taskFilterTime,
    setTaskFilterTime,
    taskFilterStatus,
    setTaskFilterStatus,
    taskFilterView,
    setTaskFilterView
}: {
    taskFilterTime: string,
    setTaskFilterTime: Function,
    taskFilterStatus: string,
    setTaskFilterStatus: Function,
    taskFilterView: string,
    setTaskFilterView: Function
}) {

    const [viewPanelVisibility, setViewPanelVisibility] = useState(false);
    let showPanel = viewPanelVisibility ? "hidden" : "";

    const selectFilter = (e: any) => {
        let name: string;

        if (e.target.nodeName === "BUTTON") name = e.target.name;
        else if (e.target.nodeName === "SPAN") name = e.target.parentElement.name;
        else if (e.target.parentNode.nodeName === "DIV") name = e.target.parentNode.parentNode.name;
        else name = e.target.parentNode.name;

        if (name === "allTime" || name === "today" || name === "week" || name === "month") {
            setTaskFilterTime(name)
        } else if (name === "allTypes" || name === "done" || name === "inprogress" || name === "todo" || name === "pending") {
            setTaskFilterStatus(name)
        } else if (name === "list" || name === "kanban" || name === "timeline" || name === "calendar") {
            setTaskFilterView(name)
        }
    };

    return <section id="view-panel" className="flex h-full items-center justify-center gap-2">
        <Card className={`flex h-full w-[200px] flex-col gap-2 ${showPanel}`}>
            <h2 className="text-xl font-bold">View</h2>
            <nav className="flex w-full flex-col gap-1">
                <Button className="flex w-full items-center justify-start gap-2 text-start" name="allTime" onClick={(e) => selectFilter(e)} mode="button" variante="transparent">
                    <SelectCircle active={taskFilterTime === "allTime"} /><span>All time</span></Button>
                <Button className="flex w-full items-center justify-start gap-2 text-start" name="today" onClick={(e) => selectFilter(e)} mode="button" variante="transparent">
                    <SelectCircle active={taskFilterTime === "today"} /><span>Today</span></Button>
                <Button className="flex w-full items-center justify-start gap-2 text-start" name="week" onClick={(e) => selectFilter(e)} mode="button" variante="transparent">
                    <SelectCircle active={taskFilterTime === "week"} /><span>This week</span></Button>
                <Button className="flex w-full items-center justify-start gap-2 text-start" name="month" onClick={(e) => selectFilter(e)} mode="button" variante="transparent">
                    <SelectCircle active={taskFilterTime === "month"} /><span>This month</span></Button>
                <hr className="my-2" />
                <Button className="flex w-full items-center justify-start gap-2 text-start" name="allTypes" onClick={(e) => selectFilter(e)} mode="button" variante="transparent">
                    <SelectCircle active={taskFilterStatus === "allTypes"} /><span>All types</span></Button>
                <Button className="flex w-full items-center justify-start gap-2 text-start" name="todo" onClick={(e) => selectFilter(e)} mode="button" variante="transparent">
                    <SelectCircle active={taskFilterStatus === "todo"} /><span>To do</span></Button>
                <Button className="flex w-full items-center justify-start gap-2 text-start" name="pending" onClick={(e) => selectFilter(e)} mode="button" variante="transparent">
                    <SelectCircle active={taskFilterStatus === "pending"} /><span>Pending</span></Button>
                <Button className="flex w-full items-center justify-start gap-2 text-start" name="inprogress" onClick={(e) => selectFilter(e)} mode="button" variante="transparent">
                    <SelectCircle active={taskFilterStatus === "inprogress"} /><span>In progress</span></Button>
                <Button className="flex w-full items-center justify-start gap-2 text-start" name="done" onClick={(e) => selectFilter(e)} mode="button" variante="transparent">
                    <SelectCircle active={taskFilterStatus === "done"} /><span>Done</span></Button>
                <hr className="my-2" />
                <Button className="flex w-full items-center justify-start gap-2 text-start" name="list" onClick={(e) => selectFilter(e)} mode="button" variante="transparent">
                    <SelectCircle active={taskFilterView === "list"} /><span>List</span></Button>
                <Button className="flex w-full items-center justify-start gap-2 text-start" name="kanban" onClick={(e) => selectFilter(e)} mode="button" variante="transparent">
                    <SelectCircle active={taskFilterView === "kanban"} /><span>Kanban</span></Button>
                <Button className="flex w-full items-center justify-start gap-2 text-start" name="timeline" onClick={(e) => selectFilter(e)} mode="button" variante="transparent">
                    <SelectCircle active={taskFilterView === "timeline"} /><span>Timeline</span></Button>
                <Button className="flex w-full items-center justify-start gap-2 text-start" name="calendar" onClick={(e) => selectFilter(e)} mode="button" variante="transparent">
                    <SelectCircle active={taskFilterView === "calendar"} /><span>Calendar</span></Button>
            </nav>
        </Card>
        <Button className="h-8 w-1.5 rounded-lg bg-slate-500 transition-all hover:h-12 hover:bg-slate-700" mode="button" variante="no-style" onClick={() => setViewPanelVisibility(viewPanelVisibility ? false : true)} />
    </section>
};