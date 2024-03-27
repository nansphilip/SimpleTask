'use client'

import Header from "@/components/header";
import Button from "@/components/button";
import Input from "@/components/input";
import Background from "@/components/background";
import { Tab, TabButton, TabButtonList, TabContent, TabContentList } from "@/components/tab";

import React, { ReactEventHandler, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Auth() {

    const router = useRouter();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submitSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const body: { name: string, email: string, password: string, }
        = { name: name, email: email, password: password, };

        // console.log(body);

        try {
            await fetch(`/api/auth/sign-up`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            })

            // router.push('/dashboard')
        } catch (error) {
            console.error(error)
        }
    }

    const submitLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const body: { email: string, password: string, }
        = { email: email, password: password, };

        // console.log(body);

        try {
            await fetch(`/api/auth/sign-up`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            })

            // router.push('/dashboard')
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <Header />
            <main className="flex-1 flex flex-col justify-center items-center">
                <Tab selectedTab="signUp">
                    <TabButtonList>
                        <TabButton label="signUp">Sign In</TabButton>
                        <TabButton label="login">Login</TabButton>
                    </TabButtonList>

                    <TabContentList>
                        <TabContent label="signUp">
                            <form onSubmit={submitSignUp} className="flex gap-4 flex-col justify-center items-center">
                                <Input type="text" name="name" placeholder="Name" required autoFocus onChange={setName} value={name}/>
                                <Input type="text" name="email" placeholder="Email" required onChange={setEmail} value={email}/>
                                <Input type="password" name="password" placeholder="Password" required onChange={setPassword} value={password}/>
                                <Button mode="submit" className="w-full">Sign Up</Button>
                            </form>
                        </TabContent>

                        <TabContent label="login">
                            <form onSubmit={submitLogin} className="flex gap-4 flex-col justify-center items-center">
                                <Input type="text" name="email" placeholder="Email" required autoFocus onChange={setEmail} value={email}/>
                                <Input type="password" name="password" placeholder="Password" required onChange={setPassword} value={password}/>
                                <Button mode="submit" className="w-full">Login</Button>
                            </form>
                        </TabContent>
                    </TabContentList>
                </Tab>
            </main>
            <Background />
        </>
    );
}
