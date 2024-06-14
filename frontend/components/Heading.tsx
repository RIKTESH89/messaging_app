import React from 'react';

interface HeadingProps {
    children: string;
}

export function Heading({ children }: HeadingProps) {
    return (
        <div className="font-bold text-3xl text-black sm:text-5xl p-4 m-2">
            {children}
        </div>
    );
}
