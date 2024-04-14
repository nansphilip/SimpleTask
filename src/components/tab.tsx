'use client'

import Card from "@components/card";
import React, { createContext, useContext, useState } from "react";

const TabContext = createContext({
    currentSelectedTab: '',
    setCurrentSelectedTab: (label: string) => { },
});

/**
 * A component that manages the display of tabbed content. It initializes the selected tab based on `selectedTab` prop and provides the current selected tab state to all child components through context.
 * 
 * @param {Object} props - Component props.
 * @param {string} props.selectedTab - The identifier of the initially selected tab.
 * @param {React.ReactNode} props.children - Child components, which can be `TabButtonList` and `TabContentList`.
 * 
 * @example
 * <Tab selectedTab="signUp">
 *   <TabButtonList>
 *     <TabButton label="signUp">Sign In</TabButton>
 *     <TabButton label="login">Login</TabButton>
 *   </TabButtonList>
 *   <TabContentList>
 *     <TabContent label="signUp">Sign Up Form...</TabContent>
 *     <TabContent label="login">Login Form...</TabContent>
 *   </TabContentList>
 * </Tab>
 */
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
            <div className="flex flex-col items-center justify-center gap-2">{children}</div>
        </TabContext.Provider>
    );
}

/**
 * A container component for `TabButton` components. It visually organizes the buttons in a horizontal layout.
 * 
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - `TabButton` components representing each tab.
 */
export function TabButtonList({ children }:
    {
        children: React.ReactNode
    }) {

    return (
        <div className="flex w-full flex-row items-center justify-center gap-2 rounded-md bg-gray-100 p-1">
            {children}
        </div>
    );
}

/**
 * Represents a clickable button for switching between tabs. It uses context to check if it is the current selected tab and updates the current selected tab on click.
 * 
 * @param {Object} props - Component props.
 * @param {string} props.label - The unique identifier for this tab, used to determine if it's the current selected tab.
 * @param {React.ReactNode} props.children - The content to display inside the button, typically the tab title.
 */
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

/**
 * A container component that wraps the content of all tabs. It should contain `TabContent` components for each tab.
 * 
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - `TabContent` components representing the content for each tab.
 */
export function TabContentList({ children }:
    {
        children: React.ReactNode,
    }) {

    return (
        <Card>{children}</Card>
    );
}

/**
 * Represents the content of a single tab. It renders its children only if its `label` matches the current selected tab in the context.
 * 
 * @param {Object} props - Component props.
 * @param {string} props.label - The unique identifier for this content, matching the `label` of a `TabButton`.
 * @param {React.ReactNode} props.children - The actual content to display when this tab is selected.
 */
export function TabContent({ label, children }:
    {
        label: string,
        children: React.ReactNode,
    }) {

    const { currentSelectedTab, setCurrentSelectedTab } = useContext(TabContext);

    return currentSelectedTab === label ? <div>{children}</div> : null;
}
