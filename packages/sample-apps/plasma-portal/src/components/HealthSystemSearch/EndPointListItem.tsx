import React from "react";
import { Link } from "react-router-dom";
import IEndpoint from "./IEndpoint";

export interface IEndPointListItemProps { 
    endpoint: IEndpoint; 
    authParams: any; 
}

export default function EndPointListItem(props: IEndPointListItemProps) {
    return (
        <div className="p-3 text-left hover:bg-indigo-300">
            <Link to="/launch" state={{ authParams: { ...props.authParams, iss: props.endpoint.address } }} className="text-center">
                <span>{props.endpoint.name}</span><br />
                <span className="text-sm">{props.endpoint.address}</span>
            </Link>
        </div>
    )
}