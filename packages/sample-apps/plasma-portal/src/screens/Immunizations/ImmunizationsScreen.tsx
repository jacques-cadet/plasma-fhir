import React, { useContext } from 'react';
import { FHIRr4 } from "plasma-fhir-react-components";

import { Immunization } from "../../plasma-fhir/api/FHIRResourceHelpers";
import { getImmunizations } from "../../plasma-fhir/api/FHIRClientHelper";
import { FHIRClientContext } from "../../plasma-fhir/FHIRClient";
import { Card } from "../../components";
import useDataLoadScreen from "./../../hooks/useDataLoadScreen";

export default function ImmunizationScreen() {
    const context = useContext(FHIRClientContext);
    const { 
        data: immunizationData, isDataLoaded, hasErrorLoading, errorMessage,
        elLoadingSpinner, elErrorMessage
    } = useDataLoadScreen<Immunization>({
        context: context,
        getData: getImmunizations
    });

    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold pb-5">Immunizations</h1>

            {/* Error Message */}
            {elErrorMessage}

            {/* Loading Spinner */}
            {elLoadingSpinner}

            {/* Immunizations */}
            {isDataLoaded && !hasErrorLoading ? 
            <div className="g-4">
                {
                    immunizationData.map((immunization, idx) => { 
                        return (
                            <Card style={{ marginTop: "10px" }} key={`ImmunizationCard_${idx}`}>
                                <FHIRr4.ImmunizationView immunization={immunization} />
                            </Card>
                        );
                    })
                }
            </div> : null}
        </div>
    );
}