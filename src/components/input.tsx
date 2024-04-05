import { useState } from 'react';
import Button from '@components/button';

export default function Input({ type, name, id, placeholder, onChange, onBlur, value, className, required, autoFocus, }:
    {
        type: string,
        name: string,
        id?: string,
        placeholder?: string,
        onChange?: (e: any) => void,
        onBlur?: () => void,
        value?: string,
        className?: string,
        required?: any,
        autoFocus?: any
    }) {

    const [passwordVisible, setPasswordVisible] = useState(false);
    const commonStyle = "px-4 py-1 rounded-md border border-gray-100 outline-gray-500 focus:outline focus:outline-2 transition-all";

    return (
        <>
            <input
                type={type === "passwordToggle" ?
                    (passwordVisible ? "text" : "password")
                    : type}
                name={name}
                id={id ?? name}
                onBlur={onBlur}
                onChange={onChange ? (e) => onChange(e.target.value) : undefined}
                value={value}
                placeholder={placeholder}
                className={`${commonStyle}, ${className}`}
                required={required}
                autoFocus={autoFocus} />

            {type === "passwordToggle" ?
                <Button variante="border" className="w-full" mode="button" onClick={() => { passwordVisible ? setPasswordVisible(false) : setPasswordVisible(true); }}>
                    {passwordVisible ? "Hide password" : "Show password"}
                </Button>
                : <></>}
        </>
    );
}