'use client'

import React, { createContext, useContext, useState } from "react";

/**
 * Creates a React context for managing the selected tab state.
 * This context will provide a way for the TabParent component to communicate
 * the current selected tab and the method to update it to any child components.
 */
const TabContext = createContext({
    selectedContext: '',
    setSelectedContext: (label: string) => { }
});

/**
 * A component that serves as the parent container for tab items.
 * It initializes and provides the selected tab state to its children
 * through the TabContext.
 * 
 * @param {Object} props - Component props.
 * @param {string} props.selectedTab - The initially selected tab label.
 * @param {React.ReactNode} props.children - Child components of TabParent.
 */
export function TabParent({ selectedTab, children }:
    {
        selectedTab: string,
        children: React.ReactNode
    }) {

    const [selectedState, setSelectedState] = useState(selectedTab);

    const mapping = { selectedContext: selectedState, setSelectedContext: setSelectedState };

    return (
        <TabContext.Provider value={mapping}>
            <div className="flex gap-2 flex-row items-center justify-center p-1 rounded-md bg-gray-100">
                {children}
            </div>
        </TabContext.Provider>
    );
}

/**
 * Represents a single tab child that can be selected. When clicked, it updates
 * the current selected tab state in the parent through the context.
 * 
 * @param {Object} props - Component props.
 * @param {string} props.label - The label identifying this tab.
 * @param {React.ReactNode} props.children - Content to be displayed within this tab.
 */
export function TabChild({ label, children }:
    {
        label: string,
        children: React.ReactNode
    }) {

    const { selectedContext, setSelectedContext } = useContext(TabContext);

    const commonClass = "w-full px-4 py-1 rounded-md",
        classListSelected = "bg-white shadow-md",
        classListNotSelected = "hover:bg-gray-200 transition-all";

    const classList = selectedContext === label ?
        `${commonClass} ${classListSelected}` :
        `${commonClass} ${classListNotSelected}`;

    return (
        <button onClick={() => setSelectedContext(label)} className={classList}>
            {children}
        </button>
    );
}
