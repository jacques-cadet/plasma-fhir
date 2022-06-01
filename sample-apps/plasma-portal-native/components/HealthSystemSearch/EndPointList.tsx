import React from "react";
import IEndpoint from "./IEndpoint";
import EndPointListItem from "./EndPointListItem";

export interface IEndPointListProps { 
    endpoints: IEndpoint[]; 
    authParams: any; 
}

export default function EndPointList(props: IEndPointListProps) {
    return (
        <>
            {props.endpoints.map((endPoint: IEndpoint, index: number) => {
                return (
                    <EndPointListItem key={`EndPointItem_${index}`} endpoint={endPoint} authParams={props.authParams} />
                );
            })}
        </>
    )
}