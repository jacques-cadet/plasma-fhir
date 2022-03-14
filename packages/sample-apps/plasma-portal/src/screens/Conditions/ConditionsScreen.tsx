import React, { useContext } from "react";
import Client from 'fhirclient/lib/Client';
import { FHIRr4 } from "plasma-fhir-react-components";

import { Condition } from "../../plasma-fhir/api/FHIRResourceHelpers";
import { getConditions } from "../../plasma-fhir/api/FHIRClientHelper";
import { FHIRClientContext } from "../../plasma-fhir/FHIRClient";
import { Card } from "../../components";
import useDataLoadScreen from "./../../hooks/useDataLoadScreen";

// TODO: For DSTU2, we don't want to pass in "problem-list-item". Don't pass in anything.

export default function ConditionsScreen() {
    const context = useContext(FHIRClientContext);
    const { 
        data: conditions, isDataLoaded, hasErrorLoading, errorMessage,
        elLoadingSpinner, elErrorMessage
    } = useDataLoadScreen<Condition>({
        context: context,
        getData: (fhirClient: Client) => getConditions(fhirClient, "problem-list-item")
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
                conditions.map((condition: Condition, idx: number) => { 
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