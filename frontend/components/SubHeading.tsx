import React from 'react';

interface SubHeadingProps {
    children: string;
}

export function SubHeading({ children }: SubHeadingProps) {
    return (
        <div className="text-xl sm:text-2xl px-2 pb-2 mx-16 text-gray-500 max-w-md">
            {children}
        </div>
    );
}
