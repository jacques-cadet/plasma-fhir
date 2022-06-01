import React from "react";

export default function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded" {...props}>{props.children}</button>
    );
}