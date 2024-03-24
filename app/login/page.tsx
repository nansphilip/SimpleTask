import Header from "@/components/header";
import Button from "@/components/button";
import Input from "@/components/input";
import Background from "@/components/background";

import { Tab, TabButton, TabButtonList, TabContent, TabContentList } from "@/components/tab";

export default function Login() {
    return (
        <>
            <Header />
            <main className="flex-1 flex flex-col justify-center items-center">
                <Tab select="signUp">
                    <TabButtonList>
                        <TabButton label="signUp">Sign In</TabButton>
                        <TabButton label="login">Login</TabButton>
                    </TabButtonList>

                    <TabContentList>
                        <TabContent label="signUp">
                            <form action="signUp" method="post" className="flex gap-4 flex-col justify-center items-center">
                                <Input type="text" name="fullName" placeholder="Full name" />
                                <Input type="text" name="email" placeholder="Email" />
                                <Input type="password" name="password" placeholder="Password" />
                                <Button mode="submit" className="w-full">Sign Up</Button>
                            </form>
                        </TabContent>
                        <TabContent label="login">
                            <form action="login" method="post" className="flex gap-4 flex-col justify-center items-center">
                                <Input type="text" name="email" placeholder="Email" />
                                <Input type="password" name="password" placeholder="Password" />
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
