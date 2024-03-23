'use client'

import Card from "@/components/card";
import Button from "@/components/button";
import React, { useState } from 'react';

function Tab({ select, children }:
    {
        select: string,
        children: React.ReactNode,
    }) {

    const [selectedTab, setSelectedTab] = useState(select);

    return (
        <div className="flex gap-2 flex-col items-center justify-center">
            {children}
        </div>
    );
}

function TabButtonList({ children }:
    {
        children: React.ReactNode,
    }) {

    return (
        <div className="w-full flex gap-2 flex-row items-center justify-center p-1 rounded-md bg-gray-100">
            {children}
        </div>
    );
}

function TabButton({ label, children }:
    {
        label: string,
        children: React.ReactNode,
    }) {

    const classList = "w-full px-4 py-1 rounded-md",
        classListSelected = "bg-white shadow-md",
        classListNotSelected = "hover:bg-gray-200 transition-all";

    const [selectedTab, setSelectedTab] = useState("signUp");

    function handleClick() {
        setSelectedTab(children as string);
        console.log(selectedTab);
    }

    if (children === selectedTab) {
        return (
            <Button mode="button" onClick={handleClick} variante="no-style" className={`${classList} ${classListSelected}`}>
                {children}
            </Button>
        );
    }

    return (
        <Button mode="button" onClick={handleClick} variante="no-style" className={`${classList} ${classListNotSelected}`}>
            {children}
        </Button>
    );
}

function TabContentList({ children }:
    {
        children: React.ReactNode,
    }) {

    return (
        <Card>{children}</Card>
    );
}

function TabContent({ label, children }:
    {
        label: string,
        children: React.ReactNode,
    }) {

    if (label === "signUp") {
        return (
            <div>{children}</div>
        );
    }

    return null;
}

export { Tab, TabButton, TabButtonList, TabContent, TabContentList };