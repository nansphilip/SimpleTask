export default function ScreenSize() {
    return <div className="fixed z-[-1] flex size-full items-end justify-end">
        <div className="m-1 rounded-md border bg-white px-2">
            <span className="sm:hidden">Mobile</span>
            <span className="max-sm:hidden md:hidden">SM</span>
            <span className="max-md:hidden lg:hidden">MD</span>
            <span className="max-lg:hidden xl:hidden">LG</span>
            <span className="max-xl:hidden 2xl:hidden">XL</span>
            <span className="max-2xl:hidden">2XL</span>
        </div>
    </div>
}