import React from "react";

export interface ICardProps { 
    title?: JSX.Element; 
    style?: React.CSSProperties;
    children: JSX.Element;
}

export default function Card(props: ICardProps) {
    return (
        <div className="max-w-sm rounded overflow-hidden border-b border-t border-l border-r border-gray-400 lg:border-gray-400" style={props.style}>
            <div className="">
                <div className="font-bold text-xl mb-2">
                    {props.title}
                </div>

                <div className="text-gray-700 text-base">
                    {props.children}
                </div>
            </div>
        </div>
    );
}