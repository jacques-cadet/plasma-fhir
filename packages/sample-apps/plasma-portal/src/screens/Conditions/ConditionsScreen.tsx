import React, { useContext } from "react";
import Client from 'fhirclient/lib/Client';
import { FHIRr4 } from "plasma-fhir-react-components";

import { FHIRClientHelper, FHIRResourceHelpers as PlasmaFHIR } from "plasma-fhir-app-utils";
import { FHIRClientContext } from "../../plasma-fhir/FHIRClient";
import { Card } from "../../components";
import useDataLoadScreen from "./../../hooks/useDataLoadScreen";

// TODO: For DSTU2, we don't want to pass in "problem-list-item". Don't pass in anything.

export default function ConditionsScreen() {
    const context = useContext(FHIRClientContext);
    const { 
        data: conditions, isDataLoaded, hasErrorLoading, errorMessage,
        elLoadingSpinner, elErrorMessage
    } = useDataLoadScreen<PlasmaFHIR.Condition>({
        context: context,
        getData: (fhirClient: Client) => FHIRClientHelper.getConditions(fhirClient, "problem-list-item")
    });

    console.log(conditions);

    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold pb-5">Conditions</h1>

            {/* Error Message */}
            {elErrorMessage}

            {/* Loading Spinner */}
            {elLoadingSpinner}

            {/* Conditions */}
            {isDataLoaded && !hasErrorLoading ? 
            <div className="g-4">
            {
                conditions.map((condition: PlasmaFHIR.Condition, idx: number) => { 
                    return (
                        <div className="py-2" key={"ConditionView_" + idx.toString()}>
                            <Card style={{ marginTop: "10px" }}>
                                <FHIRr4.ConditionView condition={condition} />
                            </Card>
                        </div>
                    );
                })
            }
            </div> : null}
        </div>
    );
}