'use client'

import Header from "@components/header";
import Button from "@components/button";
import Input from "@components/input";
import Background from "@components/background";
import Notification from "@components/notification";
import { Tab, TabButton, TabButtonList, TabContent, TabContentList } from "@components/tab";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { sessionCreate, sessionGet } from "@lib/session";
import FetchMethod from "@lib/fetch";

export default function Authentification() {

    const router = useRouter();

    async function checkSession() {
        const session = await sessionGet();
        // console.log('Session:', session);

        if (session) {
            router.push('/dashboard');
        }
    }

    checkSession();

    const [notification, setNotification] = useState(<></>);

    // Credentials fields
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    /**
     * Authenticates the user by sending a request to the server.
     * If signUp is true, it sends a sign-up request. Otherwise, it sends a login request.
     * Displays a notification based on the response.
     * If the response is successful, creates a session and redirects to the dashboard.
     * @param signUp - Indicates whether it is a sign-up request or a login request.
     * @param event - The form event triggered by submitting the form.
     */
    const authentification = async (signUp: boolean, event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Send the request to the server and wait for the response
        const data = await FetchMethod(
            // Route of the request
            signUp ? '/api/authentification/sign-up' : '/api/authentification/login',
            // Body of the request
            signUp ? { name, email, password } : { email, password }
        );

        // Display a notification according to the response
        if (data.message === "New user created" || data.message === "Valid credentials") {
            data.message === "New user created" ?
            setNotification(<Notification variante="success">New user created</Notification>):
            setNotification(<Notification variante="success">Valid credentials</Notification>);

            // Create a session and redirect to the dashboard
            await sessionCreate(data.content);
            router.push('/dashboard');

        } else if (data.message === "Email already used" || data.message === "Invalid credentials") {
            setNotification(<Notification variante="danger">Invalid credentials</Notification>);

            setEmail('');
            setPassword('');

            setTimeout(() => setNotification(<></>), 3000);
        }
    }

    return (
        <>
            <Header isLogged={false} />
            <main className="flex-1 flex flex-col justify-center items-center">
                <Tab selectedTab="login">
                    <TabButtonList>
                        <TabButton label="signUp">Sign In</TabButton>
                        <TabButton label="login">Login</TabButton>
                    </TabButtonList>

                    <TabContentList>
                        <TabContent label="signUp">
                            <form onSubmit={(event) => authentification(true, event)} className="flex gap-4 flex-col justify-center items-center">
                                <Input type="text" name="name" placeholder="Name" required autoFocus onChange={setName} value={name} />
                                <Input type="text" name="email" placeholder="Email" required onChange={setEmail} value={email} />
                                <Input type="passwordToggle" name="password" placeholder="Password" required onChange={setPassword} value={password} />
                                <Button mode="submit" className="w-full">Sign Up</Button>
                            </form>
                        </TabContent>
                        <TabContent label="login">
                            <form onSubmit={(event) => authentification(false, event)} className="flex gap-4 flex-col justify-center items-center">
                                <Input type="text" name="email" placeholder="Email" required autoFocus onChange={setEmail} value={email} />
                                <Input type="passwordToggle" name="password" placeholder="Password" required onChange={setPassword} value={password} />
                                <Button mode="submit" className="w-full">Login</Button>
                            </form>
                        </TabContent>
                    </TabContentList>
                </Tab>
            </main>
            {notification}
            <Background />
        </>
    );
}
