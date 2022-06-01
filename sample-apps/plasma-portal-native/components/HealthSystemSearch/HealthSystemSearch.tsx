import React, { useState } from "react";
import { View, TextInput } from "react-native";
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
            <View>
                <View>
                    <View>
                        <svg className="w-6 h-6 text-gray-600" fill="currentColor" xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24">
                            <path
                                d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z">
                            </path>
                        </svg>
                    </View>
                    <TextInput placeholder="Search..." 
                        value={searchQuery}
                        onChangeText={(text: string) => setSearchQuery(text)} 
                    />
                </View>
            </View>

            {/* ENDPOINTS */}
            <View>
                <EndPointList authParams={props.authParams} endpoints={props.endpoints.filter((endPoint: IEndpoint) => doesEndpointMatchSearchQuery(searchQuery, endPoint))} />
            </View>
        </>
    );
}