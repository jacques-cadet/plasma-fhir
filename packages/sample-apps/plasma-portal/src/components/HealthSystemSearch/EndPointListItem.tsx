import React from "react";
import { Link } from "react-router-dom";
import IEndpoint from "./IEndpoint";

export interface IEndPointListItemProps { 
    endpoint: IEndpoint; 
    authParams: any; 
}

export default function EndPointListItem(props: IEndPointListItemProps) {
    return (
        <Link to="/launch" state={{ authParams: { ...props.authParams, iss: props.endpoint.address } }} className="text-center">
            <div className="p-3 text-left hover:bg-indigo-300">            
                <span>{props.endpoint.name}</span><br />
                <span className="text-sm">{props.endpoint.address}</span>
            </div>
        </Link>
    )
}