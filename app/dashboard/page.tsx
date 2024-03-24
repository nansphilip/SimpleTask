import Header from "@/components/header";
import { TabParent, TabChild } from "@/components/taaab";

export default function Dashboard() {
    return (
        <>
            <Header/>
            {/* <main className="flex-1 flex gap-4 flex-col justify-center items-center">
                <h2 className="font-bold text-2xl">Dashboard page</h2>
                <div className="w-[200px] flex gap-1 flex-col justify-center items-center">
                    <Button className="w-full" mode="/">Home</Button>
                    <Button className="w-full" variante="gray" mode="/prices">Return</Button>
                </div>
            </main> */}
            <main className="flex-1 flex gap-4 flex-col justify-center items-center">
                <TabParent selectedTab="tab-2">
                    <TabChild label="tab-1">Tab 1</TabChild>
                    <TabChild label="tab-2">Tab 2</TabChild>
                    <TabChild label="tab-3">Tab 3</TabChild>
                </TabParent>
            </main>
        </>
    );
}
