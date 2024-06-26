'use client';

import Button from "@components/button";
import Card from "@components/card";
import SelectCircle from "@components/dashboard/select-circle";

import { useContext, useEffect } from "react";
import { DashboardContext } from "@app/dashboard/page";

export default function ViewPanel({ className }: { className?: string }) {

    const {
        mobileMode,
        taskFilterTime,
        setTaskFilterTime,
        taskFilterStatus,
        setTaskFilterStatus,
        taskFilterView,
        setTaskFilterView,
        viewPanelVisible,
        setViewPanelVisible,
        mainWidth
    } = useContext(DashboardContext);

    const selectFilter = (e: any) => {
        let element = e.target;
        while (element.nodeName !== 'BUTTON') element = element.parentNode;

        const name = element.name;

        ["list", "kanban", "timeline", "calendar"]
            .map((view) => { name === view && setTaskFilterView(name) });

        ["allTime", "today", "week", "month"]
            .map((time) => { name === time && setTaskFilterTime(name) });

        ["allTypes", "done", "inprogress", "todo", "pending"]
            .map((type) => { name === type && setTaskFilterStatus(name) });
    };

    useEffect(() => {
        const closeButtonEl = document.querySelector("#view-panel > button") as HTMLElement;

        // 200px is the width of the view panel
        mobileMode ?
            closeButtonEl.style.width = mainWidth - 200 + 'px' :
            closeButtonEl.style.width = "";

    }, [mobileMode, mainWidth]);

    return <section id="view-panel" className={`flex items-center justify-center ${className}` + (viewPanelVisible ? "" : " hidden") + (mobileMode ? " w-full" : "")}>
        <Card className="flex h-full w-[200px] flex-col gap-2 overflow-y-auto">
            <nav className="flex w-full flex-col gap-1">
                <h2 className="text-xl font-bold">View</h2>
                <Button className="flex w-full items-center justify-start gap-2 text-start" name="list" onClick={(e) => selectFilter(e)} mode="button" variante="transparent">
                    <SelectCircle active={taskFilterView === "list"} /><span>List</span></Button>
                <Button className="flex w-full items-center justify-start gap-2 text-start" name="kanban" onClick={(e) => selectFilter(e)} mode="button" variante="transparent">
                    <SelectCircle active={taskFilterView === "kanban"} /><span>Kanban</span></Button>
                <Button className="flex w-full items-center justify-start gap-2 text-start" name="timeline" onClick={(e) => selectFilter(e)} mode="button" variante="transparent">
                    <SelectCircle active={taskFilterView === "timeline"} /><span>Timeline</span></Button>
                <Button className="flex w-full items-center justify-start gap-2 text-start" name="calendar" onClick={(e) => selectFilter(e)} mode="button" variante="transparent">
                    <SelectCircle active={taskFilterView === "calendar"} /><span>Calendar</span></Button>
            </nav>
            <hr className="my-2" />
            <nav className="flex w-full flex-col gap-1">
                <h2 className="text-xl font-bold">Time</h2>
                <Button className="flex w-full items-center justify-start gap-2 text-start" name="allTime" onClick={(e) => selectFilter(e)} mode="button" variante="transparent">
                    <SelectCircle active={taskFilterTime === "allTime"} /><span>All time</span></Button>
                <Button className="flex w-full items-center justify-start gap-2 text-start" name="today" onClick={(e) => selectFilter(e)} mode="button" variante="transparent">
                    <SelectCircle active={taskFilterTime === "today"} /><span>Today</span></Button>
                <Button className="flex w-full items-center justify-start gap-2 text-start" name="week" onClick={(e) => selectFilter(e)} mode="button" variante="transparent">
                    <SelectCircle active={taskFilterTime === "week"} /><span>This week</span></Button>
                <Button className="flex w-full items-center justify-start gap-2 text-start" name="month" onClick={(e) => selectFilter(e)} mode="button" variante="transparent">
                    <SelectCircle active={taskFilterTime === "month"} /><span>This month</span></Button>
            </nav>
            <hr className="my-2" />
            <nav className="flex w-full flex-col gap-1">
                <h2 className="text-xl font-bold">Status</h2>
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
            </nav>

        </Card>
        <Button className={mobileMode ? `flex h-full items-center justify-start` : ""} mode="button" variante="no-style" onClick={() => setViewPanelVisible(false)}>
            <div className={`h-8 w-1.5 rounded-lg bg-slate-500 transition-all hover:h-12 hover:bg-slate-700` + (mobileMode ? " ml-2 border-white border-2 box-content" : "")}></div>
        </Button>
    </section>
};