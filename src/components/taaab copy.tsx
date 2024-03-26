'use client'

import React, { createContext, useContext, useState } from "react";

/**
 * Context for managing the state of selected tab across the Tab components.
 * Provides the current selected tab and a function to update it.
 */
const TabContext = createContext({
    currentSelectedTab: '',
    setCurrentSelectedTab: (label: string) => { }
});

/**
 * A component that acts as a container for TabChild components.
 * It provides a context for the selected tab state, allowing any TabChild components
 * within to access and modify the current selected tab.
 * 
 * @param {Object} props - Component props.
 * @param {string} props.selectedTab - The initially selected tab's identifier.
 * @param {React.ReactNode} props.children - The child components, expected to be TabChild components.
 */
export function TabParent({ selectedTab, children }:
    {
        selectedTab: string,
        children: React.ReactNode
    }) {

    const [selectedState, setSelectedState] = useState(selectedTab);

    const contextValues = { currentSelectedTab: selectedState, setCurrentSelectedTab: setSelectedState };

    return (
        <TabContext.Provider value={contextValues}>
            <div className="flex gap-2 flex-row items-center justify-center p-1 rounded-md bg-gray-100">
                {children}
            </div>
        </TabContext.Provider>
    );
}

/**
 * Represents an individual tab within the TabParent container.
 * It utilizes the TabContext to either display as selected or not, based on the current
 * context state, and updates the state upon being clicked.
 * 
 * @param {Object} props - Component props.
 * @param {string} props.label - The unique identifier for this tab, used to determine selection state.
 * @param {React.ReactNode} props.children - The content to be displayed within the tab.
 */
export function TabChild({ label, children }:
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
