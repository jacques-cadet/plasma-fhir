import React, { useState, useEffect } from 'react';
import { IFHIRClientContext } from "plasma-fhir-react-client-context";
import Client from 'fhirclient/lib/Client';

export interface IUseDataLoadScreenProps<T> {
    context: IFHIRClientContext;
    getData: (patientId: string) => Promise<T[]>;
}

export default function useDataLoadScreen<T>(props: IUseDataLoadScreenProps<T>) {
    const [data, setData] = useState<T[]>([]);
    const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);
    const [hasErrorLoading, setHasErrorLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    useEffect(() => {
        if (!isDataLoaded)
        {
            const fhirClient = props.context.client;
            if (!fhirClient)  { return; }
            const patientId = fhirClient.patient.id || "";
            
            props.getData(patientId).then((value: T[]) => {
                console.log(value);

                setIsDataLoaded(true);
                setData(value);
            }).catch((error) => {
                setIsDataLoaded(true);
                setHasErrorLoading(true);
                setErrorMessage(error.toString());
            });
        }
    });

    // Optional component for a loading spinner...
    const elLoadingSpinner = (!isDataLoaded ? 
        <div style={{ position: "absolute", paddingTop: "20px", left: "50%"}}>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black inline" viewBox="0 0 24 24">
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
        </div> : null);

    // Optional component for error message...
    const elErrorMessage = (hasErrorLoading ?
        <div className="p-5">
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
                <p className="font-bold">Error Loading</p>
                <p>{errorMessage}</p>
            </div>
        </div> : null);

    return {
        data, isDataLoaded, hasErrorLoading, errorMessage,
        elLoadingSpinner, elErrorMessage
    };
}