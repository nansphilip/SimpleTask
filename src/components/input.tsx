export default function Input({ type, name, id, placeholder, onChange, value, className, required, autoFocus, }:
    {
        type: string,
        name: string,
        id?: string,
        placeholder?: string,
        onChange?: (e: any) => void,
        value?: string,
        className?: string,
        required?: any,
        autoFocus?: any
    }) {

    const commonStyle = "px-4 py-1 rounded-md border border-gray-100 outline-gray-500 focus:outline focus:outline-2 transition-all";

    return (
        <input
        type={type}
        name={name}
        id={id ?? name}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        value={value}
        placeholder={placeholder}
        className={`${commonStyle}, ${className}`}
        required={required}
        autoFocus={autoFocus}/>
    );
}