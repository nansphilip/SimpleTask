'use client'

import Card from "@/components/card";
import Button from "@/components/button";
import React, { createContext, useContext, useState } from "react";

const TabContext = createContext({
    currentSelectedTab: '',
    setCurrentSelectedTab: (label: string) => { },
});

export function Tab({ selectedTab, children }:
    {
        selectedTab: string,
        children: React.ReactNode
    }) {

    const [selectedState, setSelectedState] = useState(selectedTab);

    const contextValues = {
        currentSelectedTab: selectedState,
        setCurrentSelectedTab: setSelectedState
    };

    return (
        <TabContext.Provider value={contextValues}>
            <div className="flex gap-2 flex-col items-center justify-center">{children}</div>
        </TabContext.Provider>
    );
}

export function TabButtonList({ children }:
    {
        children: React.ReactNode
    }) {

    return (
        <div className="w-full flex gap-2 flex-row items-center justify-center p-1 rounded-md bg-gray-100">
            {children}
        </div>
    );
}

export function TabButton({ label, children }:
    {
        label: string,
        children: React.ReactNode
    }) {

    const { currentSelectedTab, setCurrentSelectedTab } = useContext(TabContext);

    const commonClass = "w-full px-4 py-1 rounded-md",
        classListSelected = "bg-white shadow-md",
        classListNotSelected = "hover:bg-gray-200 transition-all";

    const classList = currentSelectedTab === label ?
        `${commonClass} ${classListSelected}` :
        `${commonClass} ${classListNotSelected}`;

    return (
        <button onClick={() => setCurrentSelectedTab(label)} className={classList}>
            {children}
        </button>
    );
}

export function TabContentList({ children }:
    {
        children: React.ReactNode,
    }) {

    return (
        <Card>{children}</Card>
    );
}

export function TabContent({ label, children }:
    {
        label: string,
        children: React.ReactNode,
    }) {

    const { currentSelectedTab, setCurrentSelectedTab } = useContext(TabContext);

    return currentSelectedTab === label ? <div>{children}</div> : null;
}
