export default function Loader ({active = true} : {active? : boolean}) {
    return <div className={(active ? "" : "hidden") + ` animate-spin h-4 w-4 border-2 rounded-2xl border-gray-500 border-t-white`}></div>
}