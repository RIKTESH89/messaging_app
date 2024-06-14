import React from 'react';

interface InputComponentLikeFirstNameProps {
    name: string;
    value: string;
    placeholder: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function InputComponentLikeFirstName({ name, placeholder,value, onChange }: InputComponentLikeFirstNameProps) {
    return (
        <div className="m-5 py-3">
            <div className="text-base sm:text-xl font-medium text-left p-2">{name}</div>
            <input
                onChange={onChange}
                className="p-4 border-black shadow w-full"
                type="text"
                placeholder={placeholder}
                value={value}
            />
        </div>
    );
}
