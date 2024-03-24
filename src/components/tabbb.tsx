'use client'

import React, { useState } from "react";

export function TabParent({ selectedTab, children }:
    {
        selectedTab: string,
        children: React.ReactNode,
    }) {

    const [selected, setSelected] = useState(selectedTab);

    const handleClick = (label: string) => {
        setSelected(label);
    }

    const childrenWithProps = React.Children.map(children, child => {

        if (React.isValidElement(child)) {
            return React.cloneElement(child, {
                clicked: handleClick,
                selectedTab: selected
            } as { clicked: (label: string) => void });
        }
        return child;
    });

    return (
        <div className="flex gap-2 flex-row items-center justify-center p-1 rounded-md bg-gray-100">
            {childrenWithProps}
        </div>
    );
}

export function TabChild({ label, clicked, selectedTab, children }:
    {
        label: string,
        clicked?: (label: string) => void,
        selectedTab?: string,
        children: React.ReactNode,
    }) {

    const commonClass = "w-full px-4 py-1 rounded-md",
        classListSelected = "bg-white shadow-md",
        classListNotSelected = "hover:bg-gray-200 transition-all";

    const classList = selectedTab === label ?
        `${commonClass} ${classListSelected}` :
        `${commonClass} ${classListNotSelected}`;

    return (
        <button onClick={clicked? () => clicked(label) : undefined} className={classList}>
            {children}
        </button>
    );
}