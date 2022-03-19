import React, { useContext, useState, useEffect } from "react";

import { FHIRClientHelper, FHIRResourceHelpers as PlasmaFHIR } from "plasma-fhir-app-utils";
import { FHIRClientContext } from "../../plasma-fhir/FHIRClient";
import { Card } from "../../components";
import { FHIRr4, FHIRdstu2 } from "plasma-fhir-react-components";
import useDataLoadScreen from "./../../hooks/useDataLoadScreen";

export default function AllergiesScreen() {
    const context = useContext(FHIRClientContext);
    const { 
        data: allergyIntolerance, isDataLoaded, hasErrorLoading, errorMessage,
        elLoadingSpinner, elErrorMessage
    } = useDataLoadScreen<PlasmaFHIR.AllergyIntolerance>({
        context: context,
        getData: FHIRClientHelper.getAllergyIntolerance
    });

    // Determine which FHIR release version we're using...
    const [fhirVersion, setFhirVersion] = useState<number>(0);
    useEffect(() => {
        const fhirClient = context.client;
        if (fhirClient) {
            fhirClient.getFhirRelease().then((value: number) => {
                setFhirVersion(value);
            });
        }
    }, [setFhirVersion]);    

    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold">Allergies</h1>

            {/* Error Message */}
            {elErrorMessage}

            {/* Loading Spinner */}
            {elLoadingSpinner}

            {/* Allergies */}
            {isDataLoaded && !hasErrorLoading ? 
            <div className="g-4">
            {
                allergyIntolerance.map((allergy, idx) => { 
                    return (
                        <div className="py-2" key={"AllergyIntoleranceItem_" + idx.toString()}>
                            {fhirVersion === 2 ? <FHIRdstu2.AllergyIntoleranceView allergyIntolerance={allergy as any} /> : null}

                            {fhirVersion === 4
                                ? <Card style={{ marginTop: "10px" }}>
                                    <FHIRr4.AllergyIntoleranceView allergyIntolerance={allergy} />
                                </Card>
                                : null
                            }                            
                        </div>
                    );
                })
            }
            </div> : null}
        </div>
    );
}