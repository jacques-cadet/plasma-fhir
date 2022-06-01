import React, { useState } from "react";
import IEndpoint from "./IEndpoint";
import EndPointList from "./EndPointList";

interface IHealthSystemSearchProps { 
    endpoints: IEndpoint[]; 
    authParams: any; 
}

/** Searchable EndPoint list */
export default function HealthSystemSearch(props: IHealthSystemSearchProps) {
    const [searchQuery, setSearchQuery] = useState<string>("");

    // Returns true if endpoint matches search query...
    const doesEndpointMatchSearchQuery = function(searchQuery: string, endPoint: IEndpoint): boolean {
        const name = endPoint.name.toLowerCase();
        return name.indexOf(searchQuery.toLowerCase()) > -1;
    }

    return (
        <>
            {/* Search Bar */}
            <div className="container flex mx-auto">
                <div className="flex border-2 rounded w-full">
                    <div className="flex items-center justify-center px-4 border-r">
                        <svg className="w-6 h-6 text-gray-600" fill="currentColor" xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24">
                            <path
                                d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z">
                            </path>
                        </svg>
                    </div>
                    <input type="text" className="px-4 py-2 w-full" placeholder="Search..." 
                        value={searchQuery}
                        onChange={(e: any) => setSearchQuery(e.target.value)} 
                    />
                </div>
            </div>

            {/* ENDPOINTS */}
            <div className="py-3 flex flex-start flex-col w-full px-3">
                <EndPointList authParams={props.authParams} endpoints={props.endpoints.filter((endPoint: IEndpoint) => doesEndpointMatchSearchQuery(searchQuery, endPoint))} />
            </div>
        </>
    );
}