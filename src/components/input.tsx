export default function Input({ type, name, id, placeholder, value, className, }:
    {
        type?: string,
        name?: string,
        id?: string,
        placeholder?: string,
        value?: string,
        className?: string,
    }) {

    const commonStyle = "px-4 py-1 rounded-md border border-gray-100 outline-gray-500 focus:outline focus:outline-2 transition-all";

    if (id) {
        return (
            <input type={type} name={name} id={id} placeholder={placeholder} value={value} className={`${commonStyle}, ${className}`} />
        );
    }

    return (
        <input type={type} name={name} id={name} placeholder={placeholder} className={`${commonStyle}, ${className}`} />
    );
}