'use client'

import Header from "@components/header";
import Button from "@components/button";
import Input from "@components/input";
import Background from "@components/background";
import Notification from "@components/notification";
import { Tab, TabButton, TabButtonList, TabContent, TabContentList } from "@components/tab";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Auth() {

    const router = useRouter();
    const [notification, setNotification] = useState(<></>);

    // Credentials fields
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    /**
     * Asynchronous authentification system for sign up and login. A notification is displayed after the process. If the authentification is successful, the user is redirected to the dashboard.
     * @param method can be "signUp" or "login"
     * @param event is disabled to prevent page reload
     */
    const authentification = async (method: string, event: React.FormEvent<HTMLFormElement>,) => {
        event.preventDefault();

        let body = {};
        let address = "";

        if (method === "signUp") {
            body = { name: name, email: email, password: password, };
            address = '/api/auth/sign-up';
        } else if (method === "login") {
            body = { email: email, password: password, };
            address = '/api/auth/login';
        }
        // console.log(`Client sent ${method}:`, body);

        let data: { message: string } = { message: "" };

        // Send the request to the server and wait for the response
        try {
            const result = await fetch(address, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            data = await result.json();
            // console.log('Fetch result:', data);

        } catch (error) {
            // console.error(error);
            console.log('Failed to fetch data');
        }

        let redirect = false;

        // Display a notification according to the response
        switch (data.message) {
            // Sign up cases
            case "New user created":
                setNotification(<Notification variante="success">New user created</Notification>);
                redirect = true;
                break;

            case "Email already used":
                setNotification(<Notification variante="danger">Email already used</Notification>);
                break;

            // Login cases
            case "Valid credentials":
                setNotification(<Notification variante="success">Valid credentials</Notification>);
                redirect = true;
                break;

            case "Invalid credentials":
                setNotification(<Notification variante="danger">Invalid credentials</Notification>);
                break;
        }

        // Reset the password field and the notification after 3 seconds
        setPassword('');
        setTimeout(() => setNotification(<></>), 3000);

        if (redirect) {
            // router.push('/dashboard');
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
                            <form onSubmit={(event) => authentification("signUp", event)} className="flex gap-4 flex-col justify-center items-center">
                                <Input type="text" name="name" placeholder="Name" required autoFocus onChange={setName} value={name} />
                                <Input type="text" name="email" placeholder="Email" required onChange={setEmail} value={email} />
                                <Input type="password" name="password" placeholder="Password" required onChange={setPassword} value={password} />
                                <Button mode="submit" className="w-full">Sign Up</Button>
                            </form>
                        </TabContent>

                        <TabContent label="login">
                            <form onSubmit={(event) => authentification("login", event)} className="flex gap-4 flex-col justify-center items-center">
                                <Input type="text" name="email" placeholder="Email" required autoFocus onChange={setEmail} value={email} />
                                <Input type="password" name="password" placeholder="Password" required onChange={setPassword} value={password} />
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
