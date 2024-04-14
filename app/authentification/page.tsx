'use client'

import Header from "@components/header";
import Button from "@components/button";
import Input from "@components/input";
import Background from "@components/background";
import { Tab, TabButton, TabButtonList, TabContent, TabContentList } from "@components/tab";
import { sessionCreate, sessionGet } from "@lib/session";
import FetchMethod from "@lib/fetch";
import { NotificationContext } from '@app/layout';
import React, { useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Authentification() {

    const router = useRouter();
    const linkParam = new URLSearchParams(window.location.search).get('redirect');
    const redirectLink = linkParam ? linkParam : '/dashboard';

    // Check if user is already logged in
    async function checkSession() {
        const session = await sessionGet();
        if (session) router.push(redirectLink);
    }

    useEffect(() => { checkSession() });

    // Credentials fields
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Cross notification page system
    const setNotification = useContext(NotificationContext);

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
        const data = await FetchMethod({
            function: signUp ? 'SignUp' : 'Login',
            param: signUp ? { name, email, password } : { email, password },
        });

        // Display a notification according to the response
        if (data.message === "New user created" || data.message === "Valid credentials") {

            data.message === "New user created" ?
                setNotification({ text: "New user created", variante: "success" }) :
                setNotification({ text: "Valid credentials", variante: "success" });
            setTimeout(() => setNotification(null), 3000);

            // Create a session and redirect to the dashboard
            await sessionCreate({ user: data.content });
            router.push(redirectLink);

        } else if (data.message === "Email already used" || data.message === "Invalid credentials") {
            setNotification({ text: "Invalid credentials", variante: "danger" });
            setTimeout(() => setNotification(null), 3000);

            setEmail('');
            setPassword('');
        }
    }

    return <>
        <Header isLogged={false} />
        <main className="flex-1 flex flex-col justify-center items-center">
            <Tab selectedTab="login">
                <TabButtonList>
                    <TabButton label="signUp">Sign In</TabButton>
                    <TabButton label="login">Login</TabButton>
                </TabButtonList>

                <TabContentList>
                    <TabContent label="signUp">
                        <form onSubmit={(e) => authentification(true, e)} className="flex gap-4 flex-col justify-center items-center">
                            <Input type="text" name="name" placeholder="Name" required autoFocus onChange={setName} value={name} />
                            <Input type="text" name="email" placeholder="Email" required onChange={setEmail} value={email} />
                            <Input type="passwordToggle" name="password" placeholder="Password" required onChange={setPassword} value={password} />
                            <Button mode="submit" className="w-full">Sign Up</Button>
                        </form>
                    </TabContent>
                    <TabContent label="login">
                        <form onSubmit={(e) => authentification(false, e)} className="flex gap-4 flex-col justify-center items-center">
                            <Input type="text" name="email" placeholder="Email" required autoFocus onChange={setEmail} value={email} />
                            <Input type="passwordToggle" name="password" placeholder="Password" required onChange={setPassword} value={password} />
                            <Button mode="submit" className="w-full">Login</Button>
                        </form>
                    </TabContent>
                </TabContentList>
            </Tab>
        </main>
        <Background />
    </>
}
