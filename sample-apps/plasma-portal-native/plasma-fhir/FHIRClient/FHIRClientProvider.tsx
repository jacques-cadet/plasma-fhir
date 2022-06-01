import React, { useState } from "react";
import { oauth2 } from "fhirclient";
import Client from "fhirclient/lib/Client";
import { FHIRClientContext } from "./FHIRClientContext";

export interface IFHIRClientProviderProps { 
    children?: React.ReactNode;
}

export const FHIRClientProvider: React.FC<IFHIRClientProviderProps> = (props) => {
    const [error, setError] = useState<any>(null);
    const [client, setClient] = useState<Client | null>(null);
    const [patientId, setPatientId] = useState<string | null>(null);

    // If there is an error, just return that...
    if (error) {
        return <div>{error.message}</div>
    }

    // Return context...
    return (
        <FHIRClientContext.Provider
            value={{
                client: client,
                setClient: setClient,
                patientId: patientId,
                setPatientId: setPatientId
            }}
        >
            <FHIRClientContext.Consumer>
                {({ client }) => {
                    // If client is initialized, return the children (element wrapped by FHIRClientContextWrapper)...
                    if (client) { return props.children; }

                    // Otherwise, try to initialize it...
                    oauth2.ready().then((client: Client) => {
                        setClient(client);
                        if (client.getPatientId()) { setPatientId(client.getPatientId()); }
                        else if (client.patient && client.patient.id) { setPatientId(client.patient.id); }
                    }).catch((error) => { setError(error); });
                }}                
            </FHIRClientContext.Consumer>
        </FHIRClientContext.Provider>
    );
}